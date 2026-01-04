import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Cột 1 */}
        <div className="footer-col">
          <h3>PhoneStore</h3>
          <p>Cửa hàng điện thoại uy tín, chính hãng 100%</p>
        </div>

        {/* Cột 2: LIÊN KẾT (đã thêm lại) */}
        <div className="footer-col">
          <h3>Liên kết</h3>
          <ul className="footer-links">
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
            <li><a href="/cart">Giỏ hàng</a></li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div className="footer-col">
          <h3>Liên hệ</h3>
          <p>Email: khuubao24@gmail.com</p>
          <p>SĐT: 0389669015</p>
        </div>

      </div>

      <hr className="footer-line" />

      <div className="footer-bottom">
        © Khưu Gia Bảo - 110123004 - DA23TTA
      </div>
    </footer>
  );
}

export default Footer;
