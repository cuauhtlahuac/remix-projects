import { Link } from '@remix-run/react'
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

export default function Index() {
  return (
    <Layout className="layout">

      <Header>
        <h1 style={{ color: 'white' }}>Remix: List and detail</h1>
      </Header >

      <Content style={{ padding: '50px' }}>
        <Link to={'/product-list'} style={{ fontSize: '2rem' }}>Go to list view</Link >
      </Content>
    </Layout >
  );
}
