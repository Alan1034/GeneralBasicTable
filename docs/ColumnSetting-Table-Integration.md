# ColumnSetting 拖拽/显隐控制 BasicTable 表头 - 开发方案

## 需求概述
实现 ColumnSetting 组件拖拽排序和 Checkbox 显隐控制后，实时更新 BasicTable 的表头显示。

---

## 当前问题分析

### 现状
1. `ColumnSetting` 内部维护 `items` 状态，管理拖拽顺序和显隐状态
2. 点击"确认"时才通过 `onColumnChange` 回调通知父组件
3. `BasicTable` 直接使用 `tableColumn` prop 渲染表头，未响应 ColumnSetting 变更

### 问题
- 表头渲染与 ColumnSetting 配置不同步
- 缺少状态管理连接两个组件

---

## 方案设计

### 核心思路
`BasicTable` 作为父组件，维护处理后的列配置状态：
- 传递给 `ColumnSetting` 作为初始值
- 接收 `onColumnChange` 回调更新状态
- 使用处理后的列配置渲染表头

---

## 具体实现

### 1. BasicTable 增加状态管理

```typescript
// BasicTable.tsx
const [processedColumns, setProcessedColumns] = useState(tableColumn);

// 监听外部配置变化
useEffect(() => {
  setProcessedColumns(tableColumn);
}, [tableColumn]);

// 处理 ColumnSetting 变更
const handleColumnChange = (newColumns) => {
  setProcessedColumns(newColumns);
};
```

### 2. 表头渲染逻辑修改

```typescript
// 使用 processedColumns 并过滤 hidden 列
{processedColumns
  .filter(column => !column.hidden)
  .map((column, index) => (
    <TableHead key={column.key}>
      <div className="flex items-center">
        {column.label}
        {column.sortable && (
          <Button variant="ghost" size="icon" onClick={() => column.sortable(column.key, column, index)}>
            <ArrowDownUp className="h-4 w-4 opacity-50" />
          </Button>
        )}
      </div>
    </TableHead>
  ))}
```

### 3. ColumnSetting 组件调用

```typescript
<ColumnSetting 
  coms={props.coms} 
  tableColumn={processedColumns}  // 使用当前状态
  onColumnChange={handleColumnChange}
/>
```

### 4. 表格体同步修改

表格体渲染同样需要：
- 使用 `processedColumns` 替代 `tableColumn`
- 过滤 `hidden: true` 的列

---

## 代码改动清单

| 文件 | 改动内容 |
|------|----------|
| `BasicTable.tsx` | 1. 导入 `useState`, `useEffect`<br>2. 增加 `processedColumns` state<br>3. 增加 `handleColumnChange` 回调<br>4. 表头渲染改用 `processedColumns` 并过滤 `hidden`<br>5. 表格体渲染同步修改<br>6. `ColumnSetting` 传入 `onColumnChange` |
| `ColumnSetting.tsx` | 无需改动，当前已支持 `onColumnChange` |

---

## 数据流图

```
tableColumn (prop)
    ↓
processedColumns (state)
    ↓
┌─────────────────┐     onColumnChange      ┌─────────────────┐
│   BasicTable    │ ←────────────────────── │  ColumnSetting  │
│  (渲染表头/表格体) │                         │ (拖拽/显隐控制)  │
└─────────────────┘                         └─────────────────┘
```

---

## 注意事项

1. **重置功能**：ColumnSetting 的"重置"按钮使用传入的 `tableColumn` 恢复初始状态
2. **key 稳定性**：确保每列的 `key` 唯一且稳定，避免渲染问题
3. **性能**：列配置变更会触发重渲染，数据量大时考虑优化
