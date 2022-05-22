# Assignment 項目安裝方式

## 使用 docker-compose 安裝
> ⚠ 須先行安裝 docker 以及 docker-compose
* 部屬包含資料庫建構以及 migrate 指令操作並執行 django runserver
* 資料庫使用 PostgreSQL
* 由於安全性考量，docker-compose 部屬時未開放 5432 Port 映射，僅提供容器內部連接使用，若須另行操作，可於部屬流程完成之後，經由 CLI 介面進入內部設定，或是於部屬前修改專案內的 docker-compose.yaml，將註解的第 13、14 行解開，在進行部屬，即可將 Port 5432 映射出來。

---

## 安裝流程
<br>

1、先從 Github 上 clone 檔案下來

```bash
    git clone https://github.com/JeremyHuang0225/Assignment.git
```
2、cd 至剛剛 clone 下來的專案資料夾
```bash
    cd Assignment
```
3、輸入 docker-compose 指令並等其部屬進程執行完畢
```bash
    docker-compose up -d
```
4、當所有部屬進程均執行完畢後將會出現以下告示，需再靜等約2分鐘

![image](https://github.com/JeremyHuang0225/Assignment/blob/main/static/img/readme-example01.png)

5、至瀏覽器打開以下連結即可進行 ToDoList 網頁瀏覽
```bash
    http://localhost:8000
```