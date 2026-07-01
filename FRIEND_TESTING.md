# 朋友手机试玩最快方案

当前本地地址：

- `http://127.0.0.1:8765/` 只能你这台电脑打开。
- `http://192.168.1.103:8765/` 只能同一个 Wi-Fi 打开。

朋友不在同一个 Wi-Fi，需要把静态站上传到一个公网静态托管服务。

## 最快方式：拖拽上传

1. 打开一个静态托管服务，例如 Netlify Drop、Cloudflare Pages、Vercel、腾讯云静态网站托管。
2. 上传 `arcade-site.zip`，或上传解压后的 `outputs/` 文件。
3. 平台生成一个 HTTPS 链接。
4. 把链接发给朋友，手机浏览器直接打开。

## 这次为什么不用本机临时隧道

我已经尝试过：

- Cloudflare Tunnel
- localtunnel
- SSH 反向隧道
- 443 端口 SSH 隧道

当前网络环境把这些临时隧道拦住了，所以不要继续在本机隧道上浪费时间。静态托管才是最快稳定的试玩分发方式。

## 上传哪个文件

推荐上传：

- `arcade-site.zip`

如果平台不接受 zip，就解压后上传这些内容：

- `index.html`
- `star-dodge.html`
- `assets/`
- `data/`
- `MAINTENANCE.md`
- `SHARE.md`
- `MAINLAND_OPERATION_PLAN.md`
- `PROJECT_PROGRESS.md`

## 朋友试玩注意

- 让朋友用手机浏览器打开 HTTPS 链接。
- 第一次进入先点《星轨闪避》。
- 如果游戏太难或太快，记录反馈，我们再调节奏。
- 先不要接广告或充值，先验证玩法有没有吸引力。
