"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useState, useMemo } from "react";
import Image from "next/image";
import { MapPin, Phone, User } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useOrders } from "@/hooks/useOrders";
import { useAddress } from "@/hooks/useAddress";
import BreadcrumbComponent from "@/components/breadcrumb/BreadcrumbComponent";
import titleleftdark from "@/public/Image_Rudu/titleleft-dark.png";

const OrdersPage = () => {
  const userId = 2; // Thay thế bằng cách lấy userId thực tế Giả sử lấy được userId từ session hoặc context

  const [status, setStatus] = useState<string>("all");

  const user = useUser(userId);
  const orders = useOrders(userId);
  const address = useAddress(userId);

  const customerInfo = [
    {
      icon: <User className="w-6 h-6 text-[var(--foreground)]" />,
      content: [user?.username ?? "Name", user?.email ?? "Email"],
    },
    {
      icon: <MapPin className="w-6 h-6 text-[var(--foreground)]" />,
      content: [address || "Address"],
    },
    {
      icon: <Phone className="w-6 h-6 text-[var(--foreground)]" />,
      content: [user?.phone ?? "Phone"],
    },
  ];
  const tableHeaders = [
    { label: "STT", center: true },
    { label: "MÃ HÓA ĐƠN/NGÀY MUA" },
    { label: "KHO NHẬN HÀNG", center: true },
    { label: "SỐ SP", center: true },
    { label: "TỔNG TIỀN", center: true },
    { label: "TÌNH TRẠNG", center: true },
    { label: "THAO TÁC", center: true },
  ];
  const statusMap: Record<string, string> = {
    all: "Tất cả",
    pending: "Đã đặt, chưa duyệt",
    confirmed: "Đã duyệt",
    delivering: "Đang giao",
    completed: "Đã hoàn thành",
    canceled: "Đã hủy",
  };

  const statusCount = useMemo(() => {
    const count: Record<string, number> = {
      all: orders.length,
      pending: 0,
      confirmed: 0,
      delivering: 0,
      completed: 0,
      canceled: 0,
    };

    orders.forEach((order) => {
      const key = Object.keys(statusMap).find(
        (k) => statusMap[k] === order.status
      );
      if (key) count[key]++;
    });

    return count;
  }, [orders, statusMap]);

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) => status === "all" || order.status === statusMap[status]
    );
  }, [orders, status]);

  return (
    <div className="lg:max-w-6xl mx-auto sm:max-w-4xl lg:px-6 sm:px-4 px-2">
      <BreadcrumbComponent
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Danh sách đơn hàng" },
        ]}
      />

      <div className="my-6">
        <h1 className="text-2xl font-semibold mb-2">ĐƠN HÀNG</h1>
        <Image src={titleleftdark} alt="Underline" width={70} height={20} />
      </div>

      <div className="grid lg:grid-cols-[70%_30%] gap-6 sm:grid-cols-1">
        <div className="border border-[var(--sidebar-border)] h-fit">
          <div className="flex flex-col items-start justify-between px-8 py-9 bg-[var(--sidebar-accent)]">
            <h3 className="text-muted-foreground mb-4 uppercase">
              Danh sách đơn hàng
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {Object.entries(statusMap).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <span
                    onClick={() => setStatus(key)}
                    className={`${
                      status === key
                        ? "text-[var(--sidebar-foreground)]"
                        : "text-muted-foreground cursor-pointer hover:text-[var(--sidebar-foreground)]"
                    }`}
                  >
                    {value} ({statusCount[key]})
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableHead
                    key={index}
                    className={header.center ? "text-center" : undefined}
                  >
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={tableHeaders.length}
                    className="text-center"
                  >
                    Không có đơn hàng nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order, index) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-center">
                      {index < 10 ? `0${index + 1}` : index + 1}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{order.id}</p>
                        <p className="text-[var(--sidebar-ring)] text-xs">
                          {new Date(order.orderDate).toLocaleString("vi-VN")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{order.store}</TableCell>
                    <TableCell className="text-center">
                      {order.totalItem}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.totalPrice.toLocaleString("vi-VN")}đ
                    </TableCell>
                    <TableCell className="text-center">
                      {order.status}
                    </TableCell>
                    <TableCell className="text-center">
                      <Link
                        href={`/account/orders/${order.id}`}
                        className="underline hover:text-[var(--chart-1)]"
                      >
                        Chi tiết
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="border border-[var(--sidebar-border)] bg-[var(--sidebar-accent)] h-fit px-8 py-9">
          <div>
            <h3>THÔNG TIN KHÁCH HÀNG</h3>
          </div>
          <div className="flex flex-col gap-4 mt-4 mb-8">
            {customerInfo.map((info, index) => (
              <div key={index} className="flex items-start gap-4 mb-2">
                <div className="w-[10%] min-w-[30px] flex justify-center">
                  {info.icon}
                </div>
                <div className="w-[90%]">
                  {info.content.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <Link
              href={`/account/addresses`}
              className="underline hover:text-[var(--chart-1)]"
            >
              Chi tiết địa chỉ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
