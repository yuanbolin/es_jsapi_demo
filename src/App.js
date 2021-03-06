import {Component} from 'react'
import logo from './logo.svg';
import './App.css';
import {Client} from '@elastic/elasticsearch'

const client = new Client({node: 'http://192.168.1.162:9200', name: '苑博林'})

// const client = new Client({node: 'http://192.168.14.130:5601', name: '苑博林'})

class App extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.clientIndex()  //新增索引源
        // this.clientCreate() //新增数据
        // this.clientBulkCreate() //批量新增数据
        this.clientSearch()  //条件查询
        // this.clientMsearch()  //批量索引查询
        // this.clientGet()  //id查询
        // this.clientMget()  //批量id查询
        // this.clientMget2()  //批量索引源查询
        // this.clientCount()  //根据条件查询数量
        // this.clientUpdate( ) //修改
        // this.clientBulkUpdate() //批量修改数据
        // this.clientDelete() //删除
        // this.clientBulkDelete() //批量删除
    }

    clientIndex = () => {
        client.index({
            index: 'yuanbolin',
            id: 1,
            body: {
                '@timestamp': new Date(),
                '@version': "1",
                app_name: "web",
                app_port: "7602",
                host: "192.168.14.1",
                level: "INFO",
                logger_name: "jsAPI新增",
                message: "jsAPI新增实例",
            }
        }, (error, response) => {
            if (response) console.log(response)
            if (error) console.log(error)
        })
    }

    clientBulkCreate = () => {
        const dataset = [{
            '@timestamp': new Date(),
            '@version': "1",
            app_name: "web",
            app_port: "7602",
            host: "192.168.1.185",
            level: "WARN",
            logger_name: "jsAPI新增",
            message: "jsAPI新增实例",
        },
            {
                '@timestamp': new Date(),
                '@version': "1",
                app_name: "app",
                app_port: "7602",
                host: "192.168.14.1",
                level: "ERROR",
                logger_name: "jsAPI新增",
                message: "jsAPI新增实例",
            },
            {
                '@timestamp': new Date(),
                '@version': "1",
                app_name: "web",
                app_port: "7602",
                host: "192.168.14.185",
                level: "DEBUG",
                logger_name: "jsAPI新增",
                message: "jsAPI新增实例",
            },
            {
                '@timestamp': new Date(),
                '@version': "1",
                app_name: "app",
                app_port: "7602",
                host: "192.168.14.1",
                level: "DEBUG",
                logger_name: "jsAPI新增",
                message: "jsAPI新增实例",
            },
            {
                '@timestamp': new Date(),
                '@version': "1",
                app_name: "web",
                app_port: "7602",
                host: "192.168.14.185",
                level: "DEBUG",
                logger_name: "jsAPI新增",
                message: "jsAPI新增实例",
            },
            {
                '@timestamp': new Date(),
                '@version': "1",
                app_name: "app",
                app_port: "7602",
                host: "192.168.14.1",
                level: "ERROR",
                logger_name: "jsAPI新增",
                message: "jsAPI新增实例",
            }]
        const body = dataset.flatMap((doc, index) => [{index: {_index: 'yuanbolin', _id: '2' + index}}, doc])
        console.log(body)
        client.bulk({refresh: true, body}, (error, response) => {
            if (response) console.log(response)
            if (error) console.log(error)
        })
    }

    clientCreate = () => {
        //新增
        client.create({
            index: 'yuanbolin',
            id: '2',
            body: {
                '@timestamp': new Date(),
                '@version': "1",
                app_name: "app",
                app_port: "5061",
                host: "192.168.1.185",
                level: "DEBUG",
                logger_name: "jsAPI新增_2",
                message: "jsAPI新增实例_2",
            }
        }, (error, response) => {
            if (response) console.log(response)
            if (error) console.log(error)
        });
    }


    clientSearch = () => {
        //查询
        client.search({
                index: 'yuanbolin',
                from: 0, //文档偏移量/下标
                size: 10, //数据量
                q: "app_name:web",  //简易查询
                // body: {
                //     aggs:{
                //         termsAgg:{
                //             terms:{
                //                 field:"_id"
                //             },
                //
                //         }
                //     },
                //     query: {
                //         bool: {
                //             filter: [   //多参数查询
                //                 {
                //                     match_phrase: {
                //                         app_name: 'web',
                //                     }
                //                 },
                //                 {
                //                     range: {
                //                         '@timestamp': {
                //                             format: "strict_date_optional_time",
                //                             gte: "2013-12-18T02:38:51.716Z",
                //                             lte: "2021-01-05T09:38:51.716Z"
                //                         }
                //                     }
                //                 }
                //             ]
                //         },
                //     },
                //     sort: [{
                //         '@timestamp': {
                //             order: 'asc'   //按照@timestamp进行排序 asc desc
                //         }
                //     }]
                // }
            },
            {
                ignore: [404],  //HTTP状态码，对于这个请求不应该被认为是错误。
                requestTimeout:
                    60000,  //最大请求时长 默认30s
                maxRetries:
                    3,  //最大重复请求次数 默认3
            },
            (err, result) => {
                if (result) console.log(result)
                if (err) console.log(err)
            }
        )
    }

    clientMsearch = () => {
        client.msearch({
            body: [
                {index: 'logback-fengcaiapp-2020.11'},
                {query: {match: {_id: '1232'}}},

                {index: 'logback-fengcaiapp-2020.12'},
                {query: {match: {_id: '1'}}}
            ]
        }, function (error, response) {
            if (response) console.log(response)
            if (error) console.log(error)
        })
    }


    clientGet = () => {
        client.get({
            index: 'logback-fengcaiapp-2020.11',
            id: '1232',
        }, function (error, response) {
            if (response) console.log(response)
            if (error) console.log(error)
        })
    }

    clientMget = () => {
        client.mget({
            index: 'logback-fengcaiapp-2020.11',
            type: '_doc',
            body: {ids: [1232, 1233, 1234]}
        }, function (error, response) {
            if (response) console.log(response)
            if (error) console.log(error)
        })
    }

    clientMget2 = () => {
        client.mget({
            body: {
                docs: [{
                    _index: 'logback-fengcaiapp-2020.11', _type: '_doc', _id: '1232'
                }, {
                    _index: 'logback-fengcaiapp-2020.12', _type: '_doc', _id: '1'
                }]
            }
        }, function (error, response) {
            if (response) console.log(response)
            if (error) console.log(error)
        })
    }

    clientCount = () => {
        // 获取搜索查询的匹配数。
        client.count({
            index: 'logback-fengcaiapp-2020.12',
            type: '_doc',
            body: {
                query: {
                    match: {
                        app_name: 'Test_2'
                    }
                }
            }
        }, (error, response) => {
            if (response) console.log(response)
            if (error) console.log(error)
        });
    }

    clientUpdate = () => {
        //修改
        client.update({
            index: 'logback-fengcaiapp-2020.11',
            type: '_doc',
            id: '1232',
            body: {
                doc: {   //需要加doc
                    tags: ['x', 'y'],
                    published: false,
                    counter: 2
                }
            }
        }, (error, response) => {
            if (response) console.log(response)
            if (error) console.log(error)
        });
    }

    clientBulkUpdate = () => {
        const dataset = [{
            id: 1,
            text: 'If I fall, don\'t bring me back. yuanbolin',
            user: 'jon',
            date: new Date(),
            region: '威海'
        }, {
            id: 2,
            text: 'Winter is coming',
            user: 'ned',
            date: new Date(),
            region: '威海'
        }, {
            id: 3,
            text: 'A Lannister always pays his debts.',
            user: 'tyrion',
            date: new Date(),
            region: '威海'
        }, {
            id: 4,
            text: 'I am the blood of the dragon.',
            user: 'daenerys',
            date: new Date()
        }, {
            id: 5, // change this value to a string to see the bulk response with errors
            text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
            user: 'arya',
            date: new Date(),
            region: '淄博'
        }, {
            id: 5, // change this value to a string to see the bulk response with errors
            text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
            user: 'arya',
            date: new Date(),
            region: '淄博'
        }, {
            id: 5, // change this value to a string to see the bulk response with errors
            text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
            user: 'arya',
            date: new Date(),
            region: '青岛'
        }]
        const body = dataset.flatMap((doc, index) => [{index: {_index: 'yuanbolin', _id: '123' + index}}, doc])
        console.log(body)
        client.bulk({refresh: true, body}, (error, response) => {
            if (response) console.log(response)
            if (error) console.log(error)
        })
    }

    clientDelete = () => {
        //删除
        client.delete({
            index: 'logback-fengcaiapp-2020.11',
            type: '_doc',
            id: '1232',
        }, function (error, response) {
            if (response) console.log(response)
            if (error) console.log(error)
        });
    }

    clientBulkDelete = () => {
        const dataset = [1, 2, 3, 4, 5]
        const body = dataset.flatMap((doc, index) => [{delete: {_index: 'yuanbolin', _id: '123' + index}}])
        console.log(body)
        client.bulk({refresh: true, body}, (error, response) => {
            if (response) console.log(response)
            if (error) console.log(error)
        })
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}


export default App;
