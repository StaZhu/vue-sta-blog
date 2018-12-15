# macOS技巧总结

`英文标题:the-technical-of-using-macos`

`写于:2013-8-30`

`修改于:2018-10-30`

### 更改iTunes默认备份位置

```bash
rm -rf ~/Library/Application\ Support/MobileSync
ln -sf /Volumes/Backup_iPhone/MobileSync  ~/Library/Application\ Support/MobileSync
mkdir /Voluems/Backup_iPhone/MobileSync
```

### 制作macOS系统U盘

```bash
sudo /Applications/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/USB --applicationpath /Applications/Install\ macOS\ Mojave.app --nointeraction
```

### 命令行升级macOS

```bash
/Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/startosinstall --converttoapfs NO --agreetolicense --volume /Volumes/Macintosh\ HD**
```

### Finder显示路径

```bash
defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES
```

### 隐藏、取消隐藏文件

```bash
chflags hidden abc.py // 隐藏
chflags nohidden abc.py // 取消隐藏

```

### 解决更新后启动界面是英文的Bug

```bash
sudo "/System/Library/CoreServices/Language Chooser.app/Contents/MacOS/Language Chooser"
```

### 磁盘工具的使用

**显示磁盘信息**

```bash
diskutil list
```

**分割分区(会抹掉原有数据）**

```bash
diskutil splitPartition 分区mount点（如disk2s4) 分割的分区个数 JHFS+ 分割后第一个分区名  JHFS+ 分割后第一个分区大小 分割后第二个分区名 分割后第二个分区大小 依次类推
```

**合并分区（保持原有数据）**

```bash
diskutil mergePartitions JHFS+ 合并后的分区名 分区mount点1（如disk2s4）分区mount点2（如disk2s5）
```

**格式化分区**

```bash
diskutil eraseVolume JHFS+ 抹掉后的分区名 分区mount点（如disk2s5)
```

**格式化磁盘**

```bash
diskutil eraseDisk JHFS+ 抹掉后的分区名 磁盘mount点（如disk0）
```

**NTFS磁盘默认不挂载**

```bash
diskutil info disk0s3|grep Volume\ UUID  // 获取disk0s3的UUID
echo UUID=获取到的UUID none ntfs rw,noauto > /etc/fstab  // 写入到fstab
```

### 查看MD5 SHA256 SHA1

```bash
md5 /path/to/your/file // MD5
openssl dgst -sha1 /path/to/your/file // SHA1
openssl dgst -sha256 /path/to/your/file // SHA256
```

### Finder挂载网站

```bash
brew cask install osxfuse
brew install sshfs
sshfs root@47.95.234.194:/ /Volumes/StaZhu.com -ovolname=StaZhu.com
```

### 查看端口监听 

```bash
sudo  lsof -ni | grep LISTEN 
或 
sudo lsof -iTCP -sTCP:LISTEN -nP
```

### 查看文本文件编码

```bash
file /path/to/your/file
```

### Man配置文件

```bash
cat /private/etc/man.conf
```

### Man文件转换为文本文件

```bash
cd /path/to/save/file
man xxx | col -b >xxx.txt
```

### macOS中的替身与软链接的区别

>替身指向的文件，在文件系统内移动或者重命名，都不影响通过替身找到它，而符号链接不可以。
>
>替身读取需要用到macOS的API，所以在命令行下面，基本没有东西理解它（因此没法cd 向目录的的替身）

### 查看某进程读取的文件

```bash
lsof -Fn -p 进程ID
```

### 搜索指定的文件

```bash
find ./ -name *.jpg
find ./ -name *mpv*
find ./ -size +10k
find ./ 
```

### 搜索内容含指定关键词的文件

```bash
grep -lr xxx dir
```

### macOS的启动项相关

**目录**

LaunchAgents

```bash
cd ~/Library/LaunchAgents    // 登录后启动，指定用户自定义服务， 需要指定用户 644权限
cd /Library/LaunchAgents   // 登录后启动，全部用户自定义服务， 需要root wheel 644权限
cd /System/Library/LaunchAgents    //登录后启动，macOS系统自己的服务， 需要root wheel 644权限
```

LaunchDaemons

```bash
cd /Library/LaunchDaemons  // 登录前启动，全部用户自定义服务， 需要root wheel 644权限
cd /System/Library/LaunchDaemons   // 登录前启动，macOS系统自己的服务， 需要root wheel 644权限
```

**查看启动状态**

```bash
launchctl list
```

**清除dns缓存**

```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

### LR XMP预设目录

```bash
cd /Users/sta/Library/Application Support/Adobe/CameraRaw/Settings/User Presets
```

### Nginx 80端口 开机自启动

```bash
sudo cp ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.nginx.plist
```

### 开启任何来源

```bash
sudo spctl --master-disable
```

### 解决PowerPoint自动恢复保存文件的问题

```bash
rm -rf  ~/Library/Containers/com.microsoft.Powerpoint/Data/Library/Preferences/AutoRecovery/*
```