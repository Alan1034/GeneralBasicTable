#!/bin/zsh

# Check if the script is sourced
if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
    echo "Error: This script must be sourced, not executed directly."
    echo "E.g.: source refresh-npm-token.sh"
    exit 1
fi

export XGENT_NPM_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain xgent --domain-owner 438465132784 --region ap-southeast-2 --profile xgent --query authorizationToken --output text)