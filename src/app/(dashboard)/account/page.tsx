import Link from "next/link";

export default function AccountPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Tài khoản</h1>
      <p className="text-muted-foreground text-sm mt-2">Quản lý thông tin cá nhân và mật khẩu của bạn.</p>
      <Link href="/login"><button className="rounded-lg bg-red-500 px-4 py-2 text-white">Đăng xuất</button></Link>
    </div>
  )
}
