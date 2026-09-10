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

  const freeQuayCount = Math.floor(totalQuantity / 2);

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/65 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#fffdfa] h-full shadow-2xl flex flex-col animate-slideLeft border-l-2 border-amber-900/40">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#6b1414] text-amber-100 px-5 py-4 flex items-center justify-between border-b-2 border-amber-400/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base sm:text-lg font-serif tracking-wide">
              {step === 'cart' ? 'Giỏ phở của bạn' : step === 'checkout' ? 'Thông tin giao hàng' : 'Đặt món thành công'}
            </h3>
            <span className="bg-black/30 border border-amber-400/40 text-amber-200 text-xs px-2.5 py-0.5 rounded-full font-serif">
              {totalQuantity} phần
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/30 flex items-center justify-center transition cursor-pointer text-amber-200"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Promo Notification */}
        {freeQuayCount > 0 && (
          <div className="bg-[#fbf7f0] border-b border-amber-300/80 px-4 py-2 flex items-center gap-2 text-xs text-[#7f1d1d] font-literary">
            <Gift className="w-4 h-4 text-[#991b1b] shrink-0" />
            <span>
              Ưu đãi quán Cô Hân: Được <strong>tặng {freeQuayCount} đĩa quẩy giòn thơm</strong> khi đặt từ 2 bát phở!
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#fbf7f0] border border-amber-300/60 flex items-center justify-center text-[#991b1b]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif font-black text-stone-800 text-lg">
                    Giỏ hàng đang trống
                  </h4>
                  <p className="text-xs text-stone-500 max-w-xs font-literary">
                    Hãy thưởng thức các bát phở bò, phở gà gia truyền thơm lừng từ thực đơn của Cô Hân nhé!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] text-amber-100 font-serif text-xs font-bold hover:from-[#7f1d1d] hover:to-[#991b1b] transition shadow-md cursor-pointer border border-amber-400/40"
                  >
                    Xem thực đơn phở ngay
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.dish.id}
                      className="flex items-center gap-3 p-3 bg-[#fffdfa] rounded-2xl border border-amber-200/80 shadow-xs"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-amber-200">
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
                        <h5 className="font-serif font-bold text-xs sm:text-sm text-stone-900 truncate">
                          {item.dish.name}
                        </h5>
                        <div className="text-xs font-serif font-black text-[#991b1b] mt-0.5">
                          {formatPrice(item.dish.price)}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, -1)}
                            className="w-6 h-6 rounded-md bg-[#fbf7f0] border border-amber-300 flex items-center justify-center text-stone-700 hover:bg-amber-100 cursor-pointer"
                            aria-label="Giảm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-serif font-bold w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, 1)}
                            className="w-6 h-6 rounded-md bg-[#fbf7f0] border border-amber-300 flex items-center justify-center text-stone-700 hover:bg-amber-100 cursor-pointer"
                            aria-label="Tăng"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.dish.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition cursor-pointer"
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
                <label className="block text-stone-700 font-serif font-bold mb-1">
                  Họ và tên người nhận <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ví dụ: Thầy cô, bạn sinh viên Xây Dựng..."
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300/80 focus:outline-none focus:ring-2 focus:ring-[#991b1b] bg-[#fffdfa]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-serif font-bold mb-1">
                  Số điện thoại <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ví dụ: 0988 123 456"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300/80 focus:outline-none focus:ring-2 focus:ring-[#991b1b] bg-[#fffdfa]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-serif font-bold mb-1">
                  Địa chỉ nhận phở nóng <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ký túc xá, văn phòng, phòng học, số nhà..."
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300/80 focus:outline-none focus:ring-2 focus:ring-[#991b1b] bg-[#fffdfa]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-serif font-bold mb-1">
                  Yêu cầu đặc biệt (tùy chọn)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nhiều hành hoa, không mì chính, phở tái lăn..."
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300/80 focus:outline-none focus:ring-2 focus:ring-[#991b1b] bg-[#fffdfa]"
                />
              </div>

              <div className="bg-[#fbf7f0] p-3 rounded-xl border border-amber-300/60 text-xs space-y-1 font-literary">
                <div className="flex justify-between">
                  <span>Hình thức thanh toán:</span>
                  <span className="font-serif font-bold text-stone-900">Thanh toán khi nhận phở (COD)</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span className="font-serif font-bold text-emerald-700">Miễn phí giao quanh ĐH Xây Dựng & nội thành</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-1/3 py-2.5 rounded-full border border-stone-300 text-stone-700 font-serif font-bold text-xs hover:bg-stone-100 transition cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-amber-100 font-serif font-bold text-xs shadow-md transition cursor-pointer border border-amber-400/40"
                >
                  Xác nhận đặt bát phở
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 animate-bounce" />
              <h4 className="text-2xl font-serif font-black text-[#7f1d1d]">
                Đặt món thành công!
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed font-literary">
                Cảm ơn quý khách <strong>{customerName}</strong>! Cô giáo Hân và nhà bếp đang chuẩn bị những bát phở thơm nóng hổi. Quán sẽ gọi tới số <strong>{phone}</strong> để xác nhận và giao nhanh trong vòng 20–30 phút.
              </p>
              <div className="bg-[#fbf7f0] border border-amber-300 p-3 rounded-2xl text-xs text-stone-800 w-full text-left font-literary">
                <div className="font-serif font-bold mb-1 text-[#7f1d1d]">Mã đơn: #PHO-{Math.floor(100000 + Math.random() * 900000)}</div>
                <div>Tổng thanh toán: <strong className="text-[#991b1b] font-serif text-sm">{formatPrice(subtotal)}</strong></div>
                {freeQuayCount > 0 && (
                  <div className="text-amber-800 font-medium mt-1">
                    🎁 Kèm tặng {freeQuayCount} đĩa quẩy giòn thơm nóng.
                  </div>
                )}
              </div>
              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] text-amber-100 font-serif font-bold text-xs shadow-md hover:from-[#7f1d1d] hover:to-[#991b1b] transition cursor-pointer border border-amber-400/40"
              >
                Hoàn tất & Tiếp tục xem thực đơn
              </button>
            </div>
          )}
        </div>

        {/* Footer actions for step 'cart' */}
        {step === 'cart' && items.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#fbf7f0] border-t border-amber-200 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-700 font-serif font-medium">Tạm tính:</span>
              <span className="text-xl font-serif font-black text-[#991b1b]">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              id="cart-checkout-btn"
              onClick={() => setStep('checkout')}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-amber-100 font-serif font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer border border-amber-400/50"
            >
              <span>Tiến hành giao phở nóng</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
