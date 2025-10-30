# GNS3 组网

> 前提：已安装 GNS3 和 GNS3 Server (VMware)
## 配置问题
### 问题描述

在 VMware 中打开 GNS3 虚拟机时出现如下错误：

![GNS3 启动报错](https://cdn.crayoncreator.top/Blog/计网/net/2.png)

### 解决方法

参考链接： https://www.reddit.com/r/vmware/comments/1hgd5tl/virtualized_amdvrvi_is_not_supported_on_this/?tl=zh-hans

可以使用微软提供的 "Device Guard and Credential Guard hardware readiness tool"（Device Guard 和 Credential Guard 硬件准备工具）来永久禁用 Device Guard / Credential Guard。

下载地址：

https://www.microsoft.com/en-us/download/details.aspx?id=53337

操作步骤：

1. 下载 ZIP 文件并解压到一个目录。
2. 以管理员权限打开 PowerShell，切换到解压后的文件夹路径。
3. 如果没有执行脚本的权限，先运行（在 PowerShell 中）：

```powershell
Set-ExecutionPolicy Unrestricted
```

4. 然后运行工具来禁用：

```powershell
.\DG_Readiness_Tool_v3.6.ps1 -Disable
```

5. 重启电脑。启动过程中会询问是否要永久禁用 Credential Guard 与 VBS，按提示完成操作。

## 开始组网
### T1
![T1网络拓扑图](https://cdn.crayoncreator.top/Blog/计网/net/1.png)
#### T1.1题目描述：
1. 将 PC1、PC2 设置在同一个网段，子网地址是：192.168.0.0/24;
2. 将 PC3~PC8 设置在同一个网段，子网地址是：192.168.1.0/24;
3. 配置路由器，使得两个子网的各 PC 机之间可以自由通信。
#### T1.1解决步骤
1. 从`gns3`的左侧侧边栏拖动一个`Router`，四个`Switch`和八个`vpcs`，按照上方示意图进行连接。
2. 双击每个`vpcs`进行配置，具体如下：

| PC  | IP地址       | 子网掩码       | 网关         |
|-----|--------------|---------------|--------------|
| PC1 | 192.168.0.10 | 255.255.255.0 | 192.168.0.1 |
| PC2 | 192.168.0.11 | 255.255.255.0 | 192.168.0.1 |
| PC3 | 192.168.1.10 | 255.255.255.0 | 192.168.1.1 |
| PC4 | 192.168.1.11 | 255.255.255.0 | 192.168.1.1 |
| PC5 | 192.168.1.12 | 255.255.255.0 | 192.168.1.1 |
| PC6 | 192.168.1.13 | 255.255.255.0 | 192.168.1.1 |
| PC7 | 192.168.1.14 | 255.255.255.0 | 192.168.1.1 |
| PC8 | 192.168.1.15 | 255.255.255.0 | 192.168.1.1 |
3. 双击`Router`进行配置
```shell
enable

configure terminal

interface g 0/0
ip address 192.168.0.1 255.255.255.0
no shutdown
exit

interface g 0/1  
ip address 192.168.1.1 255.255.255.0
no shutdown
exit

write
```
4.done
#### T1.2题目描述：
1. 将 PC1、PC2 设置在同一个网段，子网地址是：192.168.0.0/24；
2. 将 PC3、PC5、PC7 设置在同一个网段，子网地址是：192.168.1.0/24；
3. 将 PC4、PC6、PC8 设置在同一个网段，子网地址是：192.168.2.0/24；
4. 配置交换机 1、2、3、4，使得 PC1、PC2 属于 Vlan2，PC3、PC5、PC7 属于Vlan3，PC4、PC6、PC8属于 Vlan4；
5. 测试各 PC 之间的连通性，并结合所学理论知识进行分析；
6. 配置路由器，使得拓扑图上的各 PC 机之间可以自由通信，结合所学理论对你的路由器配置过程进行详细说明
#### T1.2解决步骤：
1. 连接线路
```shell
pc1 <-> switch1 g0/0 
pc2 <-> switch1 g0/1 
pc3 <-> switch2 g0/0 
pc4 <-> switch2 g0/1 
pc5 <-> switch3 g0/0 
pc6 <-> switch3 g0/1 
pc7 <-> switch4 g0/0 
pc8 <-> switch4 g0/1
switch1 g0/2 <-> Router g0/0
switch2 g0/2 <-> Router g0/1
switch3 g0/2 <-> switch2 g0/3
switch4 g0/2 <-> switch2 g0/4
```
2. 配置`Switch1`
```shell
enable
configure terminal

vlan 2
 name PC_VLAN2
exit

interface range g0/0 - 1
 switchport mode access
 switchport access vlan 2
exit

interface g0/2
 switchport mode trunk
 switchport trunk allowed vlan 2
exit

write
```
3. 配置`Switch2`
```shell
enable
configure terminal

vlan 3
 name PC_VLAN3
vlan 4
 name PC_VLAN4
exit

interface g0/0
 switchport mode access
 switchport access vlan 3

interface g0/1
 switchport mode access
 switchport access vlan 4

interface g0/2
 switchport mode trunk
 switchport trunk allowed vlan add 3,4

interface g0/3
 switchport mode trunk
 switchport trunk allowed vlan add 3,4

interface g0/4
 switchport mode trunk
 switchport trunk allowed vlan add 3,4

write
```
4. 配置`Switch3`
```shell
enable
configure terminal

vlan 3
 name PC_VLAN3
vlan 4
 name PC_VLAN4
exit

interface g0/0
 switchport mode access
 switchport access vlan 3

interface g0/1
 switchport mode access
 switchport access vlan 4

interface g0/2
 switchport mode trunk
 switchport trunk allowed vlan add 3,4

write
```
5. 配置`Switch4`
```shell
enable
configure terminal

vlan 3
 name PC_VLAN3
vlan 4
 name PC_VLAN4
exit

interface g0/0
 switchport mode access
 switchport access vlan 3

interface g0/1
 switchport mode access
 switchport access vlan 4

interface g0/2
 switchport mode trunk
 switchport trunk allowed vlan add 3,4

write
```
6. 配置`Router`
```shell
enable
configure terminal

interface g0/0.2
 encapsulation dot1Q 2
 ip address 192.168.0.1 255.255.255.0

interface g0/1.3
 encapsulation dot1Q 3
 ip address 192.168.1.1 255.255.255.0

interface g0/1.4
 encapsulation dot1Q 4
 ip address 192.168.2.1 255.255.255.0

exit

write
```
7. 配置每个`vpcs`
```shell
• PC1 (VLAN2)：192.168.0.10/24 GW 192.168.0.1
• PC2 (VLAN2)：192.168.0.11/24 GW 192.168.0.1
• PC3 (VLAN3)：192.168.1.10/24 GW 192.168.1.1
• PC5 (VLAN3)：192.168.1.12/24 GW 192.168.1.1
• PC7 (VLAN3)：192.168.1.14/24 GW 192.168.1.1
• PC4 (VLAN4)：192.168.2.10/24 GW 192.168.2.1
• PC6 (VLAN4)：192.168.2.12/24 GW 192.168.2.1
• PC8 (VLAN4)：192.168.2.14/24 GW 192.168.2.1
```
8. 问题
如果你发现在`pc1` `ping`不到`vlan3`和`vlan4`的主机，并且你在`Router`里
面`show ip interface brief`发现`g0/3`、`g0/1.3`、`g0/1.4`有down，那你的解决办法应该是`no interface g0/0.3`和`no interface g0/0.4`，原因是这两个的ip阻碍了`g0/1.3`和`g0/1.4`的ip分配
### T2
![T2拓扑图](https://cdn.crayoncreator.top/Blog/计网/net/3.png)
#### T2.1题目描述
1. 将 PC1 设置在 192.168.1.0/24 网段；
2. 将 PC2 设置在 192.168.2.0/24 网段；
3. 将 PC3 设置在 192.168.3.0/24 网段；
4. 将 PC4 设置在 192.168.4.0/24 网段
5. 设置路由器端口的 IP 地址
6. 在路由器上配置 OSPF 协议，使各 PC 机能互相访问
#### T2.1解决步骤
1. 连接拓扑图如下
```shell
pc1 <-> sw1 g0/0
pc2 <-> sw2 g0/0
sw1 g0/1 <-> Router1 g0/0
sw2 g0/1 <-> Router2 g0/0
Router1 g0/1 <-> Router2 g0/1
Router1 g0/2 <-> Router3 g0/0
Router2 g0/2 <-> Router3 g0/1
Router4 g0/1 <-> Router3 g0/2
pc3 <-> Router3 g0/3
pc4 <-> sw3 g0/0
sw3 g0/1 <-> Router4 g0/0
```
2. 规划网段
```shell
我们将采用以下 IP 地址规划方案：
PC 网段 (用户网段):
PC1: 192.168.1.1/24 (网关: 192.168.1.254)
PC2: 192.168.2.1/24 (网关: 192.168.2.254)
PC3: 192.168.3.1/24 (网关: 192.168.3.254)
PC4: 192.168.4.1/24 (网关: 192.168.4.254)
路由器互连网段 (骨干网段):
A-B 链路: 10.0.12.0/24
A-C 链路: 10.0.13.0/24
B-C 链路: 10.0.23.0/24
C-D 链路: 10.0.34.0/24
```
自己配置吧嘻嘻
3. 配置`RouterA`
```shell
Ruijie> enable
Ruijie# configure terminal
Ruijie(config)# hostname RouterA

RouterA(config)# interface gigabitEthernet 0/0
RouterA(config-if-GigabitEthernet 0/0)# ip address 192.168.1.254 255.255.255.0
RouterA(config-if-GigabitEthernet 0/0)# no shutdown
RouterA(config-if-GigabitEthernet 0/0)# exit

RouterA(config)# interface gigabitEthernet 0/1
RouterA(config-if-GigabitEthernet 0/1)# ip address 10.0.12.1 255.255.255.0
RouterA(config-if-GigabitEthernet 0/1)# no shutdown
RouterA(config-if-GigabitEthernet 0/1)# exit

RouterA(config)# interface gigabitEthernet 0/2
RouterA(config-if-GigabitEthernet 0/2)# ip address 10.0.13.1 255.255.255.0
RouterA(config-if-GigabitEthernet 0/2)# no shutdown
RouterA(config-if-GigabitEthernet 0/2)# exit
RouterA(config)# end
RouterA# write
```
4. 配置`RouterB`
```shell
Ruijie> enable
Ruijie# configure terminal
Ruijie(config)# hostname RouterB

RouterB(config)# interface gigabitEthernet 0/0
RouterB(config-if-GigabitEthernet 0/0)# ip address 192.168.2.254 255.255.255.0
RouterB(config-if-GigabitEthernet 0/0)# no shutdown
RouterB(config-if-GigabitEthernet 0/0)# exit

RouterB(config)# interface gigabitEthernet 0/1
RouterB(config-if-GigabitEthernet 0/1)# ip address 10.0.12.2 255.255.255.0
RouterB(config-if-GigabitEthernet 0/1)# no shutdown
RouterB(config-if-GigabitEthernet 0/1)# exit

RouterB(config)# interface gigabitEthernet 0/2
RouterB(config-if-GigabitEthernet 0/2)# ip address 10.0.23.2 255.255.255.0
RouterB(config-if-GigabitEthernet 0/2)# no shutdown
RouterB(config-if-GigabitEthernet 0/2)# exit
RouterB(config)# end
RouterB# write
```
5. 配置`RouterC`
```shell
Ruijie> enable
Ruijie# configure terminal
Ruijie(config)# hostname RouterC

RouterC(config)# interface gigabitEthernet 0/3
RouterC(config-if-GigabitEthernet 0/3)# ip address 192.168.3.254 255.255.255.0
RouterC(config-if-GigabitEthernet 0/3)# no shutdown
RouterC(config-if-GigabitEthernet 0/3)# exit

RouterC(config)# interface gigabitEthernet 0/0
RouterC(config-if-GigabitEthernet 0/0)# ip address 10.0.13.3 255.255.255.0
RouterC(config-if-GigabitEthernet 0/0)# no shutdown
RouterC(config-if-GigabitEthernet 0/0)# exit

RouterC(config)# interface gigabitEthernet 0/1
RouterC(config-if-GigabitEthernet 0/1)# ip address 10.0.23.3 255.255.255.0
RouterC(config-if-GigabitEthernet 0/1)# no shutdown
RouterC(config-if-GigabitEthernet 0/1)# exit

RouterC(config)# interface gigabitEthernet 0/2
RouterC(config-if-GigabitEthernet 0/2)# ip address 10.0.34.3 255.255.255.0
RouterC(config-if-GigabitEthernet 0/2)# no shutdown
RouterC(config-if-GigabitEthernet 0/2)# exit
RouterC(config)# end
RouterC# write
```
6. 配置`RouterD`
```shell
Ruijie> enable
Ruijie# configure terminal
Ruijie(config)# hostname RouterD

RouterD(config)# interface gigabitEthernet 0/0
RouterD(config-if-GigabitEthernet 0/0)# ip address 192.168.4.254 255.255.255.0
RouterD(config-if-GigabitEthernet 0/0)# no shutdown
RouterD(config-if-GigabitEthernet 0/0)# exit

RouterD(config)# interface gigabitEthernet 0/1
RouterD(config-if-GigabitEthernet 0/1)# ip address 10.0.34.4 255.255.255.0
RouterD(config-if-GigabitEthernet 0/1)# no shutdown
RouterD(config-if-GigabitEthernet 0/1)# exit
RouterD(config)# end
RouterD# write
```
7. 配置`RouterA`
```shell
RouterA# configure terminal
RouterA(config)# router ospf 1
RouterA(config-router)# router-id 1.1.1.1
RouterA(config-router)# network 192.168.1.0 0.0.0.255 area 0
RouterA(config-router)# network 10.0.12.0 0.0.0.255 area 0
RouterA(config-router)# network 10.0.13.0 0.0.0.255 area 0
RouterA(config-router)# end
RouterA# write
```
8. 配置`RouterB`
```shell
RouterB# configure terminal
RouterB(config)# router ospf 1
RouterB(config-router)# router-id 2.2.2.2
RouterB(config-router)# network 192.168.2.0 0.0.0.255 area 0
RouterB(config-router)# network 10.0.12.0 0.0.0.255 area 0
RouterB(config-router)# network 10.0.23.0 0.0.0.255 area 0
RouterB(config-router)# end
RouterB# write
```
9. 配置`RouterC`
```shell
RouterC# configure terminal
RouterC(config)# router ospf 1
RouterC(config-router)# router-id 3.3.3.3
RouterC(config-router)# network 192.168.3.0 0.0.0.255 area 0
RouterC(config-router)# network 10.0.13.0 0.0.0.255 area 0
RouterC(config-router)# network 10.0.23.0 0.0.0.255 area 0
RouterC(config-router)# network 10.0.34.0 0.0.0.255 area 0
RouterC(config-router)# end
RouterC# write
```
10. 配置`RouterD`
```shell
RouterD# configure terminal
RouterD(config)# router ospf 1
RouterD(config-router)# router-id 4.4.4.4
RouterD(config-router)# network 192.168.4.0 0.0.0.255 area 0
RouterD(config-router)# network 10.0.34.0 0.0.0.255 area 0
RouterD(config-router)# end
RouterD# write
```
11. 校验
```shell
RouterC# show ip ospf neighbor
你应该能看到 RouterC 已经与 RouterA, RouterB, RouterD 建立了 Full 状态的邻居关系
RouterA# show ip route
你应该能看到标记为 O (OSPF) 的路由，指向 192.168.2.0/24, 192.168.3.0/24, 192.168.4.0/24 等网段。
PC1> ping 192.168.2.1
PC1> ping 192.168.3.1
PC1> ping 192.168.4.1
```
> !!!由于 ARP 广播，第一次 ping 可能会超时，请尝试第二次
#### T2.2题目描述
对路由器 1 进行访问控制配置，使得PC1 无法访问其它PC，也不能被其它 PC 机访问
#### T2.2解决步骤
```shell
RouterA# configure terminal
RouterA(config)#

RouterA(config)# access-list 100 deny ip host 192.168.1.1 any

RouterA(config)# access-list 100 permit ip any any

RouterA(config)# access-list 101 deny ip any host 192.168.1.1

RouterA(config)# access-list 101 permit ip any any

RouterA(config)# interface gigabitEthernet 0/0

RouterA(config-if-GigabitEthernet 0/0)# ip access-group 100 in

RouterA(config-if-GigabitEthernet 0/0)# ip access-group 101 out

RouterA(config-if-GigabitEthernet 0/0)# exit
RouterA(config)# end
RouterA# write
```
测试方法
```shell
pc1 ping any -> timeout
pc2 ping pc1 -> timeout
pc2 ping any except pc1 -> pong!!!
```
#### T2.3题目描述
对路由器 1 进行访问控制配置，使得PC1 不能访问PC2，但能访问其它 PC 机
#### T2.4解决步骤
```shell
RouterA# configure terminal
RouterA(config)#

RouterA(config)# interface gigabitEthernet 0/0
RouterA(config-if-GigabitEthernet 0/0)# no ip access-group 100 in
RouterA(config-if-GigabitEthernet 0/0)# no ip access-group 101 out
RouterA(config-if-GigabitEthernet 0/0)# exit

RouterA(config)# no access-list 100
RouterA(config)# no access-list 101

RouterA(config)# access-list 102 deny ip host 192.168.1.1 host 192.168.2.1

RouterA(config)# access-list 102 permit ip any any

RouterA(config)# interface gigabitEthernet 0/0

RouterA(config-if-GigabitEthernet 0/0)# ip access-group 102 in

RouterA(config-if-GigabitEthernet 0/0)# exit
RouterA(config)# end
RouterA# write
```
> 如果出现ping pc3和pc4不通或超时
> RouterA# clear ip ospf process
> 然后等待一会再ping