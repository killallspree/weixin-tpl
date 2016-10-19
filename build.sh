#!/bin/bash
ENV_BASE=/home/huangpeng/workspace
MOD_NAME="fis-user"
TAR="$MOD_NAME.tar.gz"

#show fis-plus version
fis3 --version --no-color
if [ -d output ];then
    rm -rf output
fi
#通过 fis3 命令进行构建，构建的 media 为 prod ，这个可以根据用户具体配置修改
fis3 release prod -d output
#进入output目录
cd output
#删除产出的test目录
rm -rf test
mkdir -p data/smarty
mv plugin data/smarty
mv config data/smarty

#将output目录进行打包
tar zcf $TAR ./*

#mv $TAR ../
mv $TAR ${ENV_BASE}

cd ../
rm -rf output

cd ${ENV_BASE}
tar zxf ${TAR}

echo "build end"
