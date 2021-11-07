import {useEffect} from 'react';
import { Table } from 'antd';
import { getDivisions } from '../utils/Http';
import store from '../store';
import { useSelector } from 'react-redux';

const columns = [
    {
      title: 'División',
      dataIndex: 'name',
      key: 'division',
    },
    {
      title: 'División Superior',
      dataIndex: ['parent', 'name'],
      key: 'division-sup',
    },
    {
      title: 'Colaboradores',
      dataIndex: 'collaborator',
      key: 'colaboradores',
    },
    {
      title: 'Nivel',
      dataIndex: 'level',
      key: 'nivel',
    },
    {
      title: 'Subdivisiones',
      dataIndex: 'subdivisions',
      key: 'subdivisiones',
      render: (subdivisions) => {
        return <p>{subdivisions.length}</p>
      }
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

function Body() {
    useEffect(() => {
        store.dispatch(getDivisions())
    }, []);
    const divisions = useSelector((state) => state.division.divisions);
    return  (
        <>
            <Table
                key="divisions"
                columns={columns}
                pagination={{ current: 1, pageSize: 12 }}
                dataSource={divisions}
                bordered
                />
        </>
    )
}

export default Body;
