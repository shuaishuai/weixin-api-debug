import React from 'react';
import { Switch, Route, routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import dynamic from 'dva/dynamic';
import { Layout, Menu, Breadcrumb, Alert, Icon } from 'antd';
const { Header, Content, Footer } = Layout;
const MenuItem = Menu.Item;
const BreadcrumbItem = Breadcrumb.Item;

// import App from './routes/app'

const { ConnectedRouter } = routerRedux;


export default function router({ history, app }) {
  const routes = [
    {
      path: '/menu',
      models: () => [
        import('./models/menu'),
      ],
      component: () => import('./pages/MenuPage'),
    },
    {
      path: '/message',
      models: () => [
        import('./models/message'),
      ],
      component: () => import('./pages/MessagePage'),
    },
    // {
    //   path: '/app/user/:username',
    //   models: () => [
    //     import('./models/user'),
    //   ],
    //   component: () => import('./routes/user'),
    // },
  ];

  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['index']} style={{ lineHeight: '64px' }}>
            <MenuItem key="index"><a href="#/">关于</a></MenuItem>
            <MenuItem key="menu"><a href="#/menu">菜单管理</a></MenuItem>
            <MenuItem key="message"><a href="#/message">消息模拟</a></MenuItem>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <BreadcrumbItem>菜单管理</BreadcrumbItem>
            <BreadcrumbItem>Menu</BreadcrumbItem>
          </Breadcrumb>
          <Alert message={<p>应该使用你自己的服务器做微信接口转发 <a><Icon type="question-circle-o" /></a></p>} type="warning" style={{ position: 'absolute', right: 50, top: 72, paddingRight: 8 }} />
          <div style={{ background: '#fff', padding: 15 }}>
            <Switch>
              {routes.map(({ path, ...dynamics }) => <Route exact path={path} key={path} component={dynamic({ app, ...dynamics })} />)}
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Wechat Pivot &copy; 2015-2018
        </Footer>
      </Layout>
    </ConnectedRouter>
  );
}
