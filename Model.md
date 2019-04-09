# Model Documents

## 数据模型

### 弹幕类 DanMu

流水文字弹幕为最普通弹幕类型。驻留文字弹幕为屏幕中间驻留一段时间的弹幕。流水图片弹幕要求用户先上传图片到`web`服务器，然后才能在发弹幕时选择图片发送。驻留图片弹幕为`win`内置的图片（举手等醒目的常驻的图片）。

| 类型         | danMuType(int) | ownerId(string)      | text(string)   | stayTime(int)   | color(string)                    | room(int) | direction(int) | imgUri(string)             |
| :----------- | -------------- | -------------------- | -------------- | --------------- | -------------------------------- | --------- | -------------- | -------------------------- |
| 流水文字弹幕 | 1              | 外键：字符个数小于10 | 字符个数小于30 |                 | #000000~#ffffff(default:#ffffff) | 0~9999    | 0~1(default:1) |                            |
| 驻留文字弹幕 | 2              | 外键：字符个数小于10 | 字符个数小于30 | 1~5(default:3)  | #000000~#ffffff(default:#ffffff) | 0~9999    |                |                            |
| 流水图片弹幕 | 3              | 外键：字符个数小于10 |                |                 |                                  | 0~9999    | 0~1(default:1) | 例如http://.....(网络位置) |
| 驻留图片弹幕 | 4              | 外键：字符个数小于10 |                | 5~10(default:7) |                                  | 0~9999    |                | 例如/Img/...(本地位置)     |

**说明**：数据传输采用`json`形式，即`key`:`value`形式。空表格代表该类无此`key`项。若为确定值则为该项的固定值。若为范围值则代表值域。

`danMuType`:弹幕类型。

`senderId`:弹幕发送者ID。

`text`:文字。

`stayTime`:驻留时间，单位秒。

`color`:RGB颜色。

`roomId`:房间号，每条弹幕是发往确定的弹幕。

*`direction`:流水弹幕运行方向，默认为1，即向左。（VIP可设置向右）*

*`imgUri`:资源定位符。如果为流水图片，则`win`通过该资源定位符向`web`服务器下载图片。如果为驻留图片，则根据相对资源定位加载本地图片。*

### 房间类 Room

| 房间类型 | roomId(int) | roomType(int) | roomName(string) | teacherId(string)    | owner(string)        | studentIds(List<string>) | audienceIds(List<string>) | lifeTime(int)      |
| -------- | ----------- | ------------- | ---------------- | -------------------- | -------------------- | ------------------------ | ------------------------- | ------------------ |
| 教室房间 | 100000~10000000      | 0             | 字符个数小于15   | 外键：字符个数小于10 |                      | 个数小于500(default:200) |                           | 0~360(default:180) |
| 活动房间 | 100000~10000000      | 1             | 字符个数小于15   |                      | 外键：字符个数小于10 |                          | 个数小于500(default:200)  | 0~7(default:4)     |

**说明** ：房间类主要区别为存活时间和是否**强制用户**提供学号/工号。

`roomId` :房间ID，老师/活动举办者每创建一个房间便会得到一个唯一的房间号。`window`端打开时会提示输入房间号，用户输入房间号后`window`端便开始接收指定房间的弹幕。同理，学生/观众在小程序端的房间页面点击右上角**加号**后，会显示**创建房间**和**加入房间**，点击**创建房间**又会显示**创建活动房间**和**创建教室房间**，回到前面，点击**加入房间**后会提示输入**房间号**，输入房间号后便可向指定房间发送弹幕。

`roomType`：房间类别，以此为依据要求用户是否需要提供学号/工号等身份信息。

`roomName`:房间名字。

`teacherId`：老师ID。

`ho stId`：活动举办者ID。

`studentIds`：学生**们**的ID，注意是全部学生的ID。

`audienceIds`：观众**们**的ID，注意是全部观众的ID。

~~ `lifeTime`：房间存活时间，单位为天。 ~~

### 用户类 User

| 用户类型 | Id(string)     | userType(int) | realName(string) | studentNumber(int) | staffNumber(int) | nickName(string) | sex(string)     | birthDay(Data) | roomIds(List<int>) |
| ------ | -------------- | ------------ | ---------------- | ------------------ | ---------------- | ---------------- | --------------- | -------------- | ------------------ |
| 教师   | 字符个数小于10 | 0            | 字符个数小于15   |                    | 长整型           | 字符个数小于15   | 56个枚举类型选1 |                | 个数小于20         |
| 学生   | 字符个数小于10 | 1            | 字符个数小于15   | 长整型             |                  | 字符个数小于15   | 56个枚举类型选1 | xxxx:xx:xx     | 个数小于100        |
| 游客   | 字符个数小于10 | 2            |                  |                    |                  | 字符个数小于15   | 56个枚举类型选1 |                | 个数小于10         |

**说明**：用户可以以**游客**形式开始使用小程序并使用活动房间，但是当需要使用**教室房间**时则需要注册教师或者学生信息。还有就是一个用户有需求时，是可以在**教师**和**学生**之间切换的。比如一开始我为学生，当我选择切换成老师时，会在老师表中注册一个新的元组，并且不会删除学生表中自己的信息，以便在切换回来的时候不用重新填写学生信息。还有一点注意的是，假如有老师创建了一个房间，你通过房间号进去的时候，就算你的状态是老师，系统也会帮你自动切换回学生状态。

`wxId`：注意！注意！注意！这里的Id是`微信号`。也即当第一次启动小程序时回要求绑定用户的微信。

`userType`:用户类型。

`realName`：真实姓名。

`studentNumber`：学号。

`teacherNumber`:教师号。

`nickName`:昵称。

`sex`:性别。**Agender - 无性别**、**Androgyne - 两性人（名词）**、**Androgynous - 两性人（形容词）**、**Bigender - 双性人**、**Cis - 顺性人**、**Cis Female - 顺性女**、**Cis Woman - 顺性女**、**Cis Male - 顺性男**、**Cis Man - 顺性男**、**Cisgender - 顺性人**、**Cisgender Female - 顺性女**、**Cisgender Male - 顺性男**、**Cisgender Man - 顺性男**、**Cisgender Woman - 顺性女**、**Female to Male - 女变男**、**FTM - 女变男**、**Gender Fluid - 流性人**、**Gender Nonconforming - 非常规性别**、**Gender Questioning - 性别存疑**、**Gender Variant - 变体性别**、**Genderqueer - 酷儿性别**、**Intersex - 间性人**、**Male to Female - 男变女**、**MTF - 男变女**、**Neither - 男女皆非**、**Neutrois - 无性别**、**Non-binary - 非二元**、**Other - 其他**、**Pangender - 泛性别**、**Trans - 跨性别**、**Trans Female - 跨性女**、**Trans Male - 跨性男**、**Trans Person - 跨性人**、**Trans Woman - 跨性女**、**Trans\* - 跨性别\***、**Trans\* Female - 跨性女\***、**Trans\* Male - 跨性男\***、**Trans\* Man - 跨性男\***、**Trans\* Person - 跨性人\***、**Trans\* Woman - 跨性女\***、**Transfeminine - 跨性女（形容词）**、**Transgender - 跨性别**、**Transgender Female - 跨性女**、**Transgender Male - 跨性男**、**Transgender Man - 跨性男**、**Transgender Person - 跨性人**、**Transgender Woman - 跨性女**、**Transmasculine - 跨性男（形容词）**、**Transsexual - 变性别**、**Transsexual Female - 变性女**、**Transsexual Male - 变性男**、**Transsexual Man - 变性男**、**Transsexual Person - 变性人**、**Transsexual Woman - 变性女**、**Two-spirit - 两魂人**。

`birthday`:生日。*Format: YYYY-MM-DD*

`roomIds`：房间表。每一项的值是一个房间的房间号。

### 签到类 Checkin

| Id(int)          | roomId(int)  | studentId(string)    | signInTime(int) | absenteeism(int) |
| ---------------- | ------------ | -------------------- | --------------- | ---------------- |
| 代理键，自动生成 | 外键：0~9999 | 外键：字符个数小于10 | 签到次数        | 缺勤次数         |

`Id`：用以代替房间号和学生ID的复合键。

`roomId`：房间号。

`wxId`:学生ID，注意，学生ID不是学号！是微信号！

`checkinTime`：签到时间

`checkinCount`：签到次数。

`absentCount`：缺勤次数。