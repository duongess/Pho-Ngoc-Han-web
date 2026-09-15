import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Gift } from 'lucide-react';
import { CartItem } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useLanguage } from '../context/LanguageContext';

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
  const { lang, t, getDishName } = useLanguage();
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
      alert(lang === 'en' ? 'Please fill in your Name, Phone number, and Delivery address.' : 'Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng.');
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
              {step === 'cart' ? t('cart.title') : step === 'checkout' ? t('cart.checkout_title') : t('cart.success_title')}
            </h3>
            <span className="bg-black/30 border border-amber-400/40 text-amber-200 text-xs px-2.5 py-0.5 rounded-full font-serif">
              {totalQuantity} {t('cart.items_count')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/30 flex items-center justify-center transition cursor-pointer text-amber-200"
            aria-label={lang === 'en' ? 'Close cart' : 'Đóng giỏ hàng'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Promo Notification */}
        {freeQuayCount > 0 && (
          <div className="bg-[#fbf7f0] border-b border-amber-300/80 px-4 py-2 flex items-center gap-2 text-xs text-[#7f1d1d] font-literary">
            <Gift className="w-4 h-4 text-[#991b1b] shrink-0" />
            <span>
              {t('cart.promo_banner').replace('{count}', freeQuayCount.toString())}
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
                    {t('cart.empty_title')}
                  </h4>
                  <p className="text-xs text-stone-500 max-w-xs font-literary">
                    {t('cart.empty_desc')}
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] text-amber-100 font-serif text-xs font-bold hover:from-[#7f1d1d] hover:to-[#991b1b] transition shadow-md cursor-pointer border border-amber-400/40"
                  >
                    {t('cart.empty_btn')}
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
                          alt={getDishName(item.dish)}
                          category={item.dish.category}
                          aspectRatio="square"
                          showLabel={false}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif font-bold text-xs sm:text-sm text-stone-900 truncate">
                          {getDishName(item.dish)}
                        </h5>
                        <div className="text-xs font-serif font-black text-[#991b1b] mt-0.5">
                          {formatPrice(item.dish.price)}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, -1)}
                            className="w-6 h-6 rounded-md bg-[#fbf7f0] border border-amber-300 flex items-center justify-center text-stone-700 hover:bg-amber-100 cursor-pointer"
                            aria-label={lang === 'en' ? 'Decrease' : 'Giảm'}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-serif font-bold w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, 1)}
                            className="w-6 h-6 rounded-md bg-[#fbf7f0] border border-amber-300 flex items-center justify-center text-stone-700 hover:bg-amber-100 cursor-pointer"
                            aria-label={lang === 'en' ? 'Increase' : 'Tăng'}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.dish.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition cursor-pointer"
                        title={lang === 'en' ? 'Remove item' : 'Xóa món này'}
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
                  {t('cart.name_label')} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t('cart.name_placeholder')}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300/80 focus:outline-none focus:ring-2 focus:ring-[#991b1b] bg-[#fffdfa]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-serif font-bold mb-1">
                  {t('cart.phone_label')} <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g., 0988 123 456' : 'Ví dụ: 0988 123 456'}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300/80 focus:outline-none focus:ring-2 focus:ring-[#991b1b] bg-[#fffdfa]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-serif font-bold mb-1">
                  {t('cart.address_label')} <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t('cart.address_placeholder')}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300/80 focus:outline-none focus:ring-2 focus:ring-[#991b1b] bg-[#fffdfa]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-serif font-bold mb-1">
                  {t('cart.note_label')}
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t('cart.note_placeholder')}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300/80 focus:outline-none focus:ring-2 focus:ring-[#991b1b] bg-[#fffdfa]"
                />
              </div>

              <div className="bg-[#fbf7f0] p-3 rounded-xl border border-amber-300/60 text-xs space-y-1 font-literary">
                <div className="flex justify-between">
                  <span>{t('cart.payment_method')}</span>
                  <span className="font-serif font-bold text-stone-900">{t('cart.cod')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('cart.shipping_fee')}</span>
                  <span className="font-serif font-bold text-emerald-700">{t('cart.free_shipping')}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-1/3 py-2.5 rounded-full border border-stone-300 text-stone-700 font-serif font-bold text-xs hover:bg-stone-100 transition cursor-pointer"
                >
                  {t('cart.back_btn')}
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-amber-100 font-serif font-bold text-xs shadow-md transition cursor-pointer border border-amber-400/40"
                >
                  {t('cart.confirm_btn')}
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 animate-bounce" />
              <h4 className="text-2xl font-serif font-black text-[#7f1d1d]">
                {t('cart.success_title')}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed font-literary">
                {t('cart.success_desc').replace('{name}', customerName).replace('{phone}', phone)}
              </p>
              <div className="bg-[#fbf7f0] border border-amber-300 p-3 rounded-2xl text-xs text-stone-800 w-full text-left font-literary">
                <div className="font-serif font-bold mb-1 text-[#7f1d1d]">{t('cart.order_code')} #PHO-{Math.floor(100000 + Math.random() * 900000)}</div>
                <div>{t('cart.total_payment')} <strong className="text-[#991b1b] font-serif text-sm">{formatPrice(subtotal)}</strong></div>
                {freeQuayCount > 0 && (
                  <div className="text-amber-800 font-medium mt-1">
                    {lang === 'en' ? `🎁 Includes ${freeQuayCount} free plate(s) of crispy fried dough.` : `🎁 Kèm tặng ${freeQuayCount} đĩa quẩy giòn thơm nóng.`}
                  </div>
                )}
              </div>
              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] text-amber-100 font-serif font-bold text-xs shadow-md hover:from-[#7f1d1d] hover:to-[#991b1b] transition cursor-pointer border border-amber-400/40"
              >
                {t('cart.finish_btn')}
              </button>
            </div>
          )}
        </div>

        {/* Footer actions for step 'cart' */}
        {step === 'cart' && items.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#fbf7f0] border-t border-amber-200 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-700 font-serif font-medium">{t('cart.subtotal')}</span>
              <span className="text-xl font-serif font-black text-[#991b1b]">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              id="cart-checkout-btn"
              onClick={() => setStep('checkout')}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-amber-100 font-serif font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer border border-amber-400/50"
            >
              <span>{t('cart.checkout_btn')}</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
