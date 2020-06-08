import React from 'react'
import { ProdutoApi } from '../../../../services/service-data/produto'
import Columns from './columns'
import MaterialTable from 'material-table'
import { MaterialTableIcons } from '../../../../components/DataTable/Icons'

const ListItem = () => {

    const fetchProdutos = async (query) => {

        let { count, response, page } = await ProdutoApi.list('', { page: query.page + 1, limit: query.pageSize })

        return {
            data: response,
            totalCount: count,
            page: page - 1
        }

    }


    return (


        <MaterialTable
            icons={MaterialTableIcons}
            title="Produtos"
            columns={Columns}
            data={fetchProdutos}

        />


    )

}


export default ListItem