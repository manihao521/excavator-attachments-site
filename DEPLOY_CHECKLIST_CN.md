# 中文部署清单

## 1. 必填信息
上线前请替换：

- 品牌名：KRATOR Attachments
- 域名：https://www.yourdomain.com
- 邮箱：manihao521@gmail.com
- WhatsApp：+8613370928803
- 表单地址：https://formspree.io/f/your-form-id

## 2. GitHub Secrets
在 GitHub 仓库 Settings → Secrets and variables → Actions 添加：

- CLOUDFLARE_API_TOKEN
- CLOUDFLARE_ACCOUNT_ID
- CLOUDFLARE_PAGES_PROJECT

## 3. 自动部署
推送到 main 分支后，GitHub Actions 会自动执行：

```bash
wrangler pages deploy . --project-name=$CLOUDFLARE_PAGES_PROJECT --branch=main
```

## 4. 上线后检查

- 首页是否正常打开
- 产品中心是否正常打开
- 产品详情页参数表是否显示正常
- Contact 表单 action 是否换成真实表单地址
- sitemap.xml 里的域名是否换成真实域名
- robots.txt 是否允许抓取
- llms.txt 是否存在
- Google Search Console 是否提交 sitemap

## 5. 建议优先上线页面

- Home
- Products
- Hydraulic Breaker
- Quick Hitch
- Hydraulic Pile Hammer
- Hydraulic Shear
- Hydraulic Pulverizer
- Hydraulic Compactor
- Applications
- Custom Service
- Quality Control
- Contact
