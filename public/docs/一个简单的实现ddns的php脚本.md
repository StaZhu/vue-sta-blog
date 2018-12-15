# 一个简单的实现ddns的php脚本

`英文标题:a-simple-implementation-of-ddns`

`写于:2018-3-26`

# 简介

ddns-aliyun 是一个基于php，阿里云api的动态域名服务程序，适用于macOS，OpenWRT等类UNIX环境下，PPPoE拨号获取到的局域网ip映射。

# 环境配置

ddns-aliyun 需要php-cli环境,已在macOS和OpenWRT测试。

macOS可使用自带php。

亦可使用homebrew 独立安装最新版php。

```bash
brew install php
```

OpenWRT下可使用opkg安装php及相应扩展。

```bash
opkg install php5
opkg install php5-cli
opkg install zoneinfo-core
opkg install zoneinfo-asia
opkg install php5-mod-hash
opkg install php5-mod-json
```

# 下载

```bash
git clone https://github.com/StaZhu/ddns-aliyun.git
```

# 修改参数

请自行设置AccessKeyID，AccessKeySecret，域名，域名类型，前缀，ttl 六个参数的值。

# 测试

```bash
cd ddns-aliyun
php loader.php
```

# 定时运行

```bash
crontab -e
```

请按照  `*/10 * * * * /usr/local/bin/php /path/to/your/loader.php &> /dev/null` 格式设定。

开头部分  `*/10`代表每十分钟执行一次脚本，如果你的ttl设置为600，请保持当前参数，如果ttl设置为120，则可改为 `*/2` ，依次类推。

# 许可证

 GPL General Public License 3.0 see <http://www.gnu.org/licenses/gpl-3.0.html>