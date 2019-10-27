> # 1. Setting python

>> ## 1. install virtualenv
```bash
$ pip install virtualenv
$ virtualenv .venv
```

>> ## 2. install packcages
```bash
$ . .venv/bin/activate
(.venv)$ pip install -r requirements.txt
```

>> ## 3. run flask
```bash
# Run
$ python server.py
```

# Note
## > 0. Crawler를 관리하고 Crawling된 데이터를 조회 할 수 있는 웹 제작
## > 1. 기본적인 CRUD를 처리할 있는 Back-end 구축하고, Front-end는 간단하게 구현하기
### >> 1-1. 웹 서버는 FLASK, 디자인 패턴은 React를 사용
### >> 1-2. 디자인으 포기
## > 2. Python Crawler로 데이터를 수집하기
### >> 2-1. Scrap 모듈은 Requests, Selenium, Spider 중에 선정하고 Parser는 BS4 사용
### >> 2-2. Crawler는 crontab이나 window scheduler로 일정 주기ㄹ 실행
### >> 2-3. 외부에서도 조작할 수 있도록 간단한 API서버 구축
## > 3. 2번에서 수집한 데이터로 Mart를 말아주는 Batch 만들기
### >> 3-1. Java Spring Framework( Boot, Batch, Quartz )를 사용.
### >> 3-2. 귀찮으면 ETL 오픈 소스인 Tos(Talend Open Studio)로 구현.
## > 4. 1,2,3에서 발생하는 로그들을 ElasticSearch로 조회할 수 있도록 구성
### > 4-1. Filebeat으로 로그 수집
### > 4-2. Logstash로 가공
### > 4-3. Kafka 메시지 큐에 적재
### > 4-4. Flume으로 ElasticSearch 및 DB에 분산 적재
### > 4-5. ElasticSearch에 적재되 데이터는 Kibana로 모니터링
  
# TODO
## > 1. React Setting Project 만들기
