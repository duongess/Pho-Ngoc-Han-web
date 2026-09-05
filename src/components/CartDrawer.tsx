import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Gift } from 'lucide-react';
import { CartItem } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  // Mua 3 món mang về tặng 1 chè Huế logic!
  const freeDessertsCount = Math.floor(totalQuantity / 3);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng.');
      return;
    }
    setStep('success');
  };

  const handleFinish = () => {
    onClearCart();
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slideLeft">
        
        {/* Header */}
        <div className="bg-[#d96b0c] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="font-bold text-base sm:text-lg font-serif">
              {step === 'cart' ? 'Giỏ hàng của bạn' : step === 'checkout' ? 'Thông tin giao hàng' : 'Đặt hàng thành công'}
            </h3>
            <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-sans">
              {totalQuantity} món
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/20 flex items-center justify-center transition cursor-pointer"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Promo Notification matching banner rule */}
        {freeDessertsCount > 0 && (
          <div className="bg-amber-100/90 border-b border-amber-300 px-4 py-2 flex items-center gap-2 text-xs text-amber-900">
            <Gift className="w-4 h-4 text-red-600 shrink-0" />
            <span>
              Ưu đãi: Bạn được <strong>tặng {freeDessertsCount} ly chè Huế</strong> (Chương trình mua 3 món tặng 1 chè)!
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif font-bold text-stone-800 text-lg">
                    Giỏ hàng đang trống
                  </h4>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Hãy lựa chọn các món ăn đặc sản Huế thơm ngon từ thực đơn để thêm vào giỏ hàng nhé!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2 rounded-full bg-[#d96b0c] text-white text-xs font-bold hover:bg-[#c65f0a] transition cursor-pointer"
                  >
                    Xem thực đơn ngay
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.dish.id}
                      className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <ImagePlaceholder
                          src={item.dish.image}
                          alt={item.dish.name}
                          category={item.dish.category}
                          aspectRatio="square"
                          showLabel={false}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                          {item.dish.name}
                        </h5>
                        <div className="text-xs font-bold text-[#d96b0c] mt-0.5">
                          {formatPrice(item.dish.price)}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, -1)}
                            className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                            aria-label="Giảm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, 1)}
                            className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                            aria-label="Tăng"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.dish.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition"
                        title="Xóa món này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Họ và tên người nhận <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#d96b0c]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ví dụ: 0912345678"
                  className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#d96b0c]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Địa chỉ nhận món <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Số nhà, ngõ, tên đường, phường/xã, quận/huyện..."
                  className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#d96b0c]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Ghi chú cho nhà hàng (tùy chọn)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ít cay, không hành, giao lúc 12h trưa..."
                  className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#d96b0c]"
                />
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Hình thức thanh toán:</span>
                  <span className="font-bold text-stone-900">Thanh toán khi nhận hàng (COD)</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span className="font-bold text-emerald-600">Miễn phí giao nội thành</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-1/3 py-2.5 rounded-lg border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-100 transition"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-lg bg-[#d96b0c] hover:bg-[#c65f0a] text-white font-bold text-xs shadow transition cursor-pointer"
                >
                  Xác nhận đặt đơn
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
              <h4 className="text-xl font-serif font-bold text-stone-900">
                Đặt món thành công!
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cảm ơn quý khách <strong>{customerName}</strong>! Đơn hàng của bạn đã được chuyển tới chi nhánh gần nhất. Nhân viên Nét Huế sẽ gọi số <strong>{phone}</strong> để xác nhận và giao món nóng hổi trong vòng 30 phút.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 w-full text-left">
                <div className="font-bold mb-1">Mã đơn: #NH-{Math.floor(100000 + Math.random() * 900000)}</div>
                <div>Tổng thanh toán: <strong>{formatPrice(subtotal)}</strong></div>
                {freeDessertsCount > 0 && (
                  <div className="text-red-700 font-medium mt-1">
                    🎁 Kèm tặng {freeDessertsCount} ly chè Huế thơm mát.
                  </div>
                )}
              </div>
              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-full bg-[#d96b0c] text-white font-bold text-xs shadow hover:bg-[#c65f0a] transition cursor-pointer"
              >
                Hoàn tất & Tiếp tục xem món
              </button>
            </div>
          )}
        </div>

        {/* Footer actions for step 'cart' */}
        {step === 'cart' && items.length > 0 && (
          <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-600 font-medium">Tạm tính:</span>
              <span className="text-base sm:text-lg font-black text-[#d96b0c]">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              id="cart-checkout-btn"
              onClick={() => setStep('checkout')}
              className="w-full py-3 rounded-full bg-[#d96b0c] hover:bg-[#c65f0a] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tiến hành đặt giao hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
