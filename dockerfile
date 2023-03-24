FROM 955466075186.dkr.ecr.cn-northwest-1.amazonaws.com.cn/ops-basic/nginx:1.20-alpine
ENV TZ "Asia/Shanghai"
COPY ./dist /usr/share/nginx/html
# COPY default.conf /etc/nginx/conf.d/
VOLUME /usr/share/nginx/html