import {useEffect,useState} from 'react';
import { Table,Typography,Button,Menu,Tabs,Radio,Select,Input,Row,Col } from 'antd';
import { getDivisions } from '../utils/Http';
import store from '../store';
import { useSelector } from 'react-redux';
import { PlusCircleFilled,PlusOutlined,UploadOutlined,DownloadOutlined } from '@ant-design/icons';


function castFilter(array) {
    let newArray = [];
    array.forEach(element => {
        newArray.push({
            text: element,
            value: element
        });
    });
    return newArray;
}


function Body() {
     // FUNCTIONS
    useEffect(() => {
        store.dispatch(getDivisions())
    }, []);
    const levels = useSelector((state) => [...new Set(state.division.divisions.map(d => d.level))]);
    const divisionsName = useSelector((state) => [...new Set(state.division.divisions.map(d => d.name))]);
    const divisionsParentName = useSelector((state) => [...new Set(state.division.divisions.map(d => d.parent.name))]);
    const columns = [
        {
          title: 'División',
          dataIndex: 'name',
          key: 'division',
          filters: castFilter(divisionsName),
          onFilter: (value, val) => val.name === value,
          sorter: (a, b) => a.name - b.name,
        },
        {
          title: 'División Superior',
          dataIndex: ['parent', 'name'],
          key: 'division-sup',
          filters: castFilter(divisionsParentName),
          onFilter: (value, val) => val.parent.name === value,
          sorter: (a, b) => a.parent.name - b.parent.name,
        },
        {
          title: 'Colaboradores',
          dataIndex: 'collaborator',
          key: 'colaboradores',
          onFilter: (value, val) => val.collaborator === value,
          sorter: (a, b) => a.collaborator - b.collaborator,
        },
        {
          title: 'Nivel',
          dataIndex: 'level',
          key: 'nivel',
          filters: castFilter(levels),
          onFilter: (value, val) => val.level === value,
          sorter: (a, b) => a.level - b.level,
        },
        {
          title: 'Subdivisiones',
          dataIndex: 'subdivisions',
          key: 'subdivisiones',
          render: (subdivisions) => {
            return (<>
                <span>
                    <span> {subdivisions.length}</span>
                    {subdivisions.length > 0 ? <PlusCircleFilled className="downIcon" style={{ fontSize: '14px', color: 'green' }}/> : null}
                </span>
            </>);

          },
          onFilter: (value, val) => val.subdivisions.length === value,
          sorter: (a, b) => a.subdivisions.length - b.subdivisions.length,
        },
        {
          title: 'Embajadores',
          dataIndex: 'ambassador',
          key: 'embajadores',
          render: (ambassador) => {
            return <p>{ambassador != null ? ambassador : '-'}</p>
          }
        },
    ];
    const divisions = useSelector((state) => state.division.divisions);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [q,setQ] = useState('');
    const { loading, selectedRowKeys } =  useSelector((state) => state.division.divisions);
    const rowSelection = {
        selectedRowKeys,
      };

    return  (
        <>
        <Row className="menu-title">
            <Col span={8}>
                <Typography.Title level={3}>Organización</Typography.Title>
            </Col>
            <Col span={4} offset={12}>
                <Button className="btn-mandu" type="primary" icon={<PlusOutlined />} size={'large'} />
                <Button className="btn-mandu" icon={<UploadOutlined />} size={'large'} />
                <Button className="btn-mandu" icon={<DownloadOutlined />} size={'large'} />
            </Col>
        </Row>

        <Tabs defaultActiveKey="1" activeKey="1">
            <Tabs.TabPane tab="Divisiones" key="1" className="tableDivision">
                <Row className="mb-40 mt-20">
                    <Col className="gutter-row" span={8}>
                        <Radio.Group value={'listado'}>
                            <Radio.Button value="listado">Listado</Radio.Button>
                            <Radio.Button value="arbol">Árbol</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col className="gutter-row" span={4} offset={12} xs={{ offset:8 }}>
                        <Select placeholder="Columnas" optionFilterProp="children" style={{ width: 153,height:32 }}>
                            {columns.map((column, key) => (
                                <Select.Option value={column.key} key={key}>
                                {column.title}
                                </Select.Option>
                            ))}
                        </Select>
                        <Input.Search placeholder="Buscar" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 200,height:32 }} />
                    </Col>
                </Row>

                <Table
                    columns={ columns }
                    dataSource = { divisions }
                    rowSelection={rowSelection}
                    pagination={{ divisions: divisions.length,current: page, pageSize: pageSize,onChange:(page,pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    } }}
                    bordered
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Colaboradores" key="2">

            </Tabs.TabPane>
        </Tabs>

        </>
    )


}

export default Body;
