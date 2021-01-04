## **什么是 ELK Stack？**

“ELK”是三个开源项目的首字母缩写，这三个项目分别是：Elasticsearch、Logstash 和 Kibana。

elasticsearch（存储+搜索）、logstash（收集）、kibana（展示），

Elasticsearch 是一个分布式,高性能,近实时,高可用,可伸缩的搜索和分析引擎。

Beats是轻量级采集组件,用于文件和目录采集，主要用于收集日志数据

Logstash 一个灵活的数据传输和处理系统,能够同时从多个来源采集数据，转换数据，然后将数据发送到诸如 Elasticsearch 等“存储库”中。在beats出来之前，还负责进行数据收集,但在数据收集上并不出色。

Kibana 展示组件，基于angularjs。让用户在 Elasticsearch 中使用图形和图表对数据进行可视化。

#### **Elasticsearch**

核心中的核心组件，是全文检索引擎lucence(倒排索引)的一个分布式版本。 它能从项目一开始就赋予你的数据以搜索、分析和探索的能力
Elasticsearch 不仅仅只是全文搜索，我们还将介绍结构化搜索、数据分析、地理位置和对象间关联关系等。


