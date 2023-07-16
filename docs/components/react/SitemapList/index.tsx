/**
 * 网址一栏表
 */
import React from "react";
import { Table } from "antd";
import type { TableColumnType } from "antd";
import days from "dayjs";
import { useSetState, useMount } from "ahooks";
import { querySitemapUrlList } from "./service";

type SitemapList = {
  url: string;
  lastmod: string;
  sitemapTime: string;
};

function UrlColumnTable() {
  const [state, setState] = useSetState<{
    sitemapList: SitemapList[];
    sitemapLoading: boolean;
  }>({
    sitemapList: [],
    sitemapLoading: false,
  });
  const { sitemapList, sitemapLoading } = state;

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
      render: (text) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: "最后修改时间",
      dataIndex: "lastmod",
      sorter: (a, b) => days(a.lastmod).unix() - days(b.lastmod).unix(),
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
      render: (text) => days(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "sitemap时间",
      dataIndex: "sitemapTime",
      sorter: (a, b) => days(a.sitemapTime).unix() - days(b.sitemapTime).unix(),
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
  ];

  return (
    <div bg="white" m="36" border="rounded-[12px]">
      <div font="bold" m="b-24" text="18">
        站点网址一栏表
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
      />
    </div>
  );
}

export default UrlColumnTable;
