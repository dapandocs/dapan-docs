/**
 * 网址一栏表
 */
import React from "react";
import { Table, Button } from "antd";
import type { TableColumnType } from "antd";
import days from "dayjs";
import { useSetState, useMount } from "ahooks";
import { querySitemapUrlList, queryBingBatchCommit } from "./service";

type SitemapList = {
  url: string;
  lastmod: string;
  sitemapTime: string;
};

function UrlColumnTable() {
  const [state, setState] = useSetState<{
    sitemapList: SitemapList[];
    sitemapLoading: boolean;
    selectedUrlKeys: React.Key[];
  }>({
    sitemapList: [],
    sitemapLoading: false,
    selectedUrlKeys: [],
  });
  const { sitemapList, sitemapLoading, selectedUrlKeys } = state;

  const fetchSitemapUrlList = async () => {
    setState({ sitemapLoading: true });
    const result = await querySitemapUrlList();
    if (Array.isArray(result) && result.length) {
      const list = result.map((item) => ({
        url: `https://www.skillgroup.cn/${item.url}`,
        lastmod: item.lastmod,
        sitemapTime: item.sitemapTime,
      }));
      setState({
        sitemapList: list,
        sitemapLoading: false,
      });
    } else {
      setState({
        sitemapLoading: false,
      });
    }
  };

  useMount(() => {
    fetchSitemapUrlList();
  });

  const columns: TableColumnType<any>[] = [
    {
      title: "网址",
      dataIndex: "url",
      ellipsis: true,
      render: (text) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: "最后修改时间",
      dataIndex: "lastmod",
      ellipsis: true,
      sorter: (a, b) => days(a.lastmod).unix() - days(b.lastmod).unix(),
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
      render: (text) => days(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "sitemap时间",
      dataIndex: "sitemapTime",
      ellipsis: true,
      sorter: (a, b) => days(a.sitemapTime).unix() - days(b.sitemapTime).unix(),
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setState({
        selectedUrlKeys: selectedRowKeys,
      });
    },
  };

  // Bing Search Commit
  const bingSearchCommit = async () => {
    const reponse = await queryBingBatchCommit({
      host: "https://www.skillgroup.cn",
      key: "73f89fc2fa4646d1a4ab18b23108bf26",
      keyLocation:
        "https://www.skillgroup.cn/73f89fc2fa4646d1a4ab18b23108bf26.txt",
      urlList: selectedUrlKeys,
    });
    console.log(reponse);
  };

  return (
    <div bg="white" m="12" p="8" lg:m="36" border="rounded-[12px]">
      <div font="bold" m="b-12 l-8" text="18 dark">
        站点网址一栏表
      </div>
      <div m="b-12 l-8">
        <Button
          type="primary"
          onClick={bingSearchCommit}
          disabled={selectedUrlKeys.length === 0}
        >
          Bing Search
        </Button>
      </div>
      <Table
        rowKey="url"
        dataSource={sitemapList}
        columns={columns}
        size="small"
        loading={sitemapLoading}
        pagination={{
          showTotal: (total) => `共 ${total} 条`,
        }}
        rowSelection={rowSelection}
      />
    </div>
  );
}

export default UrlColumnTable;
