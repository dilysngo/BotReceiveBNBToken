import './styles.css'
import React, { useMemo } from 'react'
import { Text } from 'claim-libs-uikit'
import { Table, Card } from 'antd'
import { trim, get } from 'lodash'

export const defaultScroll = { x: 0 }
export const pageSizeOptions = ['10', '20', '30', '100']

const CardTableCustom = ({
  id = '',
  columns = [],
  dataSource = [],
  extra = null,
  title = null,
  customTableClassName = '',
  customCardContainerClass = '',
  customPagination = {},
  customScroll = {},
  defaultPageSize = 20,
  showHeader = true,
  onClick,
  ...tableProps
}) => {
  const paginationSetting = useMemo(
    () => ({
      pageSizeOptions,
      defaultPageSize,
      showSizeChanger: true,
      total: customPagination.total ? customPagination.total : 0,
      showTotal: (total) => <Text>{`Total ${total} items`}</Text>,
    }),
    [defaultPageSize, customPagination]
  )

  const { innerWidth: width } = window

  return (
    <Card className={`report-card ${customCardContainerClass}`} showHeader={Boolean(title)} title={title} extra={extra}>
      <Table
        showHeader={showHeader}
        rowKey={(record) => `${trim(id)}-${get(record, 'owner')}`}
        className={`report-table ${customTableClassName}`}
        dataSource={dataSource}
        columns={columns}
        pagination={{ ...paginationSetting, ...customPagination }}
        scroll={{ ...defaultScroll, customScroll }}
        onRow={(record, rowIndex) => ({
          onClick: () => onClick && onClick(record, rowIndex),
        })}
        size={width < 480 ? 'middle' : ''}
        {...tableProps}
      />
    </Card>
  )
}

export default CardTableCustom
