# GitHub 仓库创建指南

## 方法一：通过GitHub网站创建（推荐）

1. 访问 https://github.com/new
2. 填写仓库信息：
   - Repository name: `libattery-openhub`
   - Description: `LiBattery OpenHub - 锂离子电池开源资源中心`
   - 选择 Public
   - 不要勾选 "Add a README file"（因为我们已经有了）
   - 不要勾选 "Add .gitignore"（因为我们已经有了）
   - 不要勾选 "Choose a license"（因为我们已经有了）

3. 点击 "Create repository"

4. 在创建成功页面，复制仓库URL：`https://github.com/InvictusG/libattery-openhub.git`

## 方法二：使用GitHub CLI（如果已安装）

```bash
# 登录GitHub
gh auth login

# 创建仓库
gh repo create libattery-openhub --public --description "LiBattery OpenHub - 锂离子电池开源资源中心"

# 设置远程仓库
git remote add origin https://github.com/InvictusG/libattery-openhub.git
```

## 创建完成后的操作

1. 设置远程仓库：
```bash
git remote add origin https://github.com/InvictusG/libattery-openhub.git
```

2. 推送代码：
```bash
git push -u origin main
```

3. 验证推送成功：
```bash
git status
```

## 注意事项

- 确保仓库名称为 `libattery-openhub`
- 确保仓库设置为 Public
- 不要初始化README、.gitignore或LICENSE文件
- 推送前确保所有文件已提交到本地仓库 