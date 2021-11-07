import {useEffect,useState} from 'react';
import { Table,Typography,Button,Menu } from 'antd';
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
    return  (
        <>
        <Menu mode="horizontal"
            className="d-flex align-items-center custom-navigation">
            <Menu.Item key="title">
                <Typography.Title level={3}>Organización</Typography.Title>
            </Menu.Item>
            <Menu.Item key="options" className="auto">
                <Button type="primary" icon={<PlusOutlined />} size={'large'} />
                <Button icon={<UploadOutlined />} size={'large'} />
                <Button icon={<DownloadOutlined />} size={'large'} />
            </Menu.Item>
        </Menu>

        <Table
            key="divisions"
            columns={ columns }
            dataSource = { divisions }
            pagination={{ divisions: divisions.length,current: page, pageSize: pageSize,onChange:(page,pageSize) => {
                setPage(page);
                setPageSize(pageSize);
            } }}

            bordered
        />
        </>
    )


}

export default Body;
