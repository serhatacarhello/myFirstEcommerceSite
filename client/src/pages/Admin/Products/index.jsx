import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { deleteProduct, fetchProductList } from "../../../utils/api";
import {
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Space, Table, Tag, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input } from "antd";

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const tableRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = useCallback(
    (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              Close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1677ff" : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: "#ffc069",
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    }),
    [searchInput, searchText, searchedColumn]
  );

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
    getNextPageParam: (lastPage, pages) => {
      const morePagesExist = lastPage?.length === 12; // number is according to backend *limit value
      if (morePagesExist) return pages.length + 1;
    },
  });

  const normalizedData = data?.pages.reduce(
    (acc, page) => [...acc, ...page],
    []
  );

  // Get next page
  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const refetchProducts = useCallback(() => {
    queryClient.invalidateQueries("admin:products");
  }, [queryClient]);

  useEffect(() => {
    refetchProducts();
  }, [refetchProducts]);

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <Text>{text}</Text>,
        ...getColumnSearchProps("name"),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Department",
        key: "department",
        dataIndex: "department",
        ...getColumnSearchProps("department"),
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (department) => (
          <Tag color={"blue"} key={department}>
            {department.toUpperCase()}
          </Tag>
        ),
      },

      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Link to={`${record._id}`}>
              <Button>Edit</Button>
            </Link>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => {
                deleteMutation.mutate(record._id);
              }}
              onCancel={() => alert("cancelled")}
              okText="Yes"
              cancelText="No"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              placement="left"
            >
              <Button type="text" style={{ borderColor: "red" }} size={"sm"} >
                Delete
              </Button>
            </Popconfirm>

          </Space>
        ),
      },
    ];
  }, [deleteMutation, getColumnSearchProps]);

  if (isLoading) {
    return (
      <Flex align={"center"} justify={"center"} h={"100vh"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          size={"xl"}
          color="red"
        />
      </Flex>
    );
  }
  if (isError) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Error
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          {error.message || `An error has occurred.`}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <Flex justifyContent={"space-between"} alignItems={"center"} my={3}>
        <Heading
          textTransform={"uppercase"}
          fontWeight={"medium"}
          color={"pink.600"}
        >
          Products
        </Heading>
        <Link to={"new"}>
          <Button type="primary">Add New Product</Button>
        </Link>
      </Flex>

      <Table
        ref={tableRef}
        dataSource={normalizedData}
        columns={columns}
        rowKey={"_id"}
        clearFilters
      />

      <Flex justifyContent={"center"} m={"1rem"} gap={1}>
        <Button
          type="primary"
          onClick={() => handleLoadMore()}
          disabled={!hasNextPage || isFetchingNextPage}
          loading={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </div>
  );
}
