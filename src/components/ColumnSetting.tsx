import { useState, useCallback, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { GripVertical, Settings } from "lucide-react";
import { cn } from "../lib/utils";

import { HandleTable, Schemas } from "general-basic-indexdb"
const { handleData, getData, clearData } = HandleTable;
const { formSchema } = Schemas;
interface TableColumn {
  key: string;
  title: string;
  hidden?: boolean;
  [key: string]: any;
}

interface ColumnSettingProps {
  tableColumn?: TableColumn[];
  DBPrimaryKey?: string;
  coms: {
    Sheet: React.ComponentType<any>;
    SheetClose: React.ComponentType<any>;
    SheetContent: React.ComponentType<any>;
    SheetDescription: React.ComponentType<any>;
    SheetFooter: React.ComponentType<any>;
    SheetHeader: React.ComponentType<any>;
    SheetTitle: React.ComponentType<any>;
    SheetTrigger: React.ComponentType<any>;
    Checkbox: React.ComponentType<any>;
    Button: React.ComponentType<any>;
  };
  onColumnChange?: (columns: TableColumn[]) => void;
}

export const ColumnSetting = (props: ColumnSettingProps) => {
  const {
    tableColumn = [],
    DBPrimaryKey,
    coms: {
      Sheet,
      SheetClose,
      SheetContent,
      SheetDescription,
      SheetFooter,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
      Checkbox,
      Button,
    },
    onColumnChange,
  } = props;
  const [items, setItems] = useState<TableColumn[]>(tableColumn);
  const listRef = useRef<HTMLDivElement>(null);
  const sortableRef = useRef<Sortable | null>(null);
  const [open, setOpen] = useState(false);

  // 生成唯一的存储键
  const storageKey = `column_setting_${tableColumn.map(col => col.key).join('_')}`;

  // 初始化时读取保存的配置
  useEffect(() => {
    console.log(formSchema)
    const loadSavedConfig = async () => {
      try {
        // 尝试读取保存的配置
        const savedItems = await getData({
          tableName: "formParams",
          propertiesKey: storageKey,
          primaryKey: DBPrimaryKey || "default",
          mapDB: formSchema
        });
        console.log(savedItems)
        if (savedItems) {
          setItems(savedItems);
          onColumnChange?.(savedItems)
        }
      } catch (error) {
        console.error('读取列配置失败:', error);
      }
    };
    loadSavedConfig();
  }, [storageKey, DBPrimaryKey]);

  useEffect(() => {
    if (open) {
      loadSortable()
    }


    return () => {
      if (sortableRef.current) {
        sortableRef.current.destroy();
        sortableRef.current = null;
      }
    };
  }, [open]);
  const loadSortable = async () => {

    let timer;
    await new Promise<void>((resolve, reject) => {
      timer = setInterval(async () => {
        if (listRef.current && !sortableRef.current) {
          sortableRef.current = new Sortable(listRef.current, {
            animation: 150,
            handle: '.drag-handle',
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            onEnd: (evt) => {
              const { oldIndex, newIndex } = evt;
              if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== newIndex) {
                setItems(prevItems => {
                  const newItems = [...prevItems];
                  const [removed] = newItems.splice(oldIndex, 1);
                  newItems.splice(newIndex, 0, removed);
                  return newItems;
                });
              }
            },
          });
          resolve();
        }
      }, 300);
    })
    clearInterval(timer);

  }

  const handleVisibilityChange = useCallback((key: string, checked: boolean) => {
    const newItems = items.map(item =>
      item.key === key ? { ...item, hidden: !checked } : item
    );
    setItems(newItems);
  }, [items]);

  const handleConfirm = useCallback(async () => {
    console.log(items)
    console.log({ items })
    try {
      // 保存配置到 IndexedDB
      await handleData({
        tableName: "formParams",
        propertiesKey: storageKey,
        parameter: JSON.parse(JSON.stringify(items)),
        primaryKey: DBPrimaryKey || "default",
        mapDB: formSchema
      });
    } catch (error) {
      console.error('保存列配置失败:', error);
    }
    onColumnChange?.(items);
  }, [items, onColumnChange, storageKey, DBPrimaryKey]);

  const handleReset = useCallback(async () => {
    try {
      // 重置本地状态
      setItems(tableColumn);

      // 清空 IndexedDB 中保存的配置

      await clearData({
        tableName: "formParams",
        primaryKey: DBPrimaryKey || "default",
        mapDB: formSchema
      });
    } catch (error) {
      console.error('重置列配置失败:', error);
    }
  }, [tableColumn, DBPrimaryKey]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>列设置</SheetTitle>
          <SheetDescription>
            拖拽调整列顺序，勾选控制列显示/隐藏
          </SheetDescription>
        </SheetHeader>

        <div className="h-full overflow-auto py-4 w-full">
          <div
            ref={listRef}
            className="space-y-1 rounded-lg p-2"
          >
            {items.map((item) => (
              <div
                key={item.key}
                data-id={item.key}
                className={cn(
                  "flex items-center gap-3 rounded-md border bg-card p-3 hover:bg-muted/50"
                )}
              >
                <div className="drag-handle flex cursor-grab items-center text-muted-foreground hover:text-foreground active:cursor-grabbing">
                  <GripVertical className="h-5 w-5" />
                </div>

                <Checkbox
                  id={`checkbox-${item.key}`}
                  checked={!item.hidden}
                  onCheckedChange={(checked: boolean) =>
                    handleVisibilityChange(item.key, checked)
                  }
                />

                <label
                  htmlFor={`checkbox-${item.key}`}
                  className={cn(
                    "flex-1 cursor-pointer text-sm font-medium",
                    item.hidden && "text-muted-foreground line-through"
                  )}
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <SheetFooter className="flex-row gap-2 sm:justify-end">
          <Button variant="outline" onClick={handleReset}>
            重置
          </Button>
          <SheetClose asChild>
            <Button variant="outline">取消</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button onClick={handleConfirm}>确认</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};


