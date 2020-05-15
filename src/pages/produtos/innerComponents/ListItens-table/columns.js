import React from 'react'

import { Box } from '@material-ui/core'


const Columns = [
    { title: 'EAN', field: 'ean' },
    { title: 'Produto', field: 'descricao' },
    { title: 'Preço', field: 'precoAtual' },
    { title: 'Preço Anterior', field: 'precoAnterior' },
    { title: 'Valido Até', field: 'validade' },
    { title: 'Status', field: 'status', render: rowData => rowData.status ? 'Ativo' : 'Inativo' },
    {
        title: 'Imagem', field: 'imagem', render: rowData => (
            <Box textAlign="center" style={{ width: 100, height: 100 }}>
                <img style={{ maxHeight: '100%', maxWidth: '100%' }} src={rowData.imagem} alt="" />
            </Box>
        )
    }
]


export default Columns
