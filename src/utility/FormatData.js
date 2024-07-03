/**
 * Hàm hỗ trợ định dạng cho tiền tệ hiển thị trên màn hình
 * @param {*} money Số tiền cần định dạng. Lưu ý data type phải là number vì đang sử dụng hàm number.toLocaleString() 
 * @returns Một string có định dạng tiền tệ VND
 */
const handleFormatMoney = (money) =>
{
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
};
export { handleFormatMoney };