import { useState } from 'react';

function PhoneVerification() {
    const [showBtn, setShowBtn] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleVerifyClick = () => {
    if(phoneNumber){
    setShowOtp(true);
    setShowBtn(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.match(/[0-9]/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const input = document.getElementById(`otp-input-${index + 1}`);
        input.focus();
      }
    }
  };

  const handleOtpKeyDown = (event, index) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput.value = '';
      prevInput.focus();
  

      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    } else if (event.key === 'ArrowLeft' && index > 0) {

      const input = document.getElementById(`otp-input-${index - 1}`);
      input.focus();
    } else if (event.key === 'ArrowRight' && index < 5) {

      const input = document.getElementById(`otp-input-${index + 1}`);
      input.focus();
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text/plain').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      if (pasteData[i].match(/[0-9]/)) {
        newOtp[i] = pasteData[i];
      }
    }
    setOtp(newOtp);
  };
  const handleResendOtpClick = () => {
    alert('Resend OTP clicked but still backend functionality is not implemented yet');
  };

  const handleChangeNumberClick = () => {
    setPhoneNumber('');
    setShowOtp(false);
    setShowBtn(true);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white border border-gray-400 rounded-lg w-96 h-100 p-8">
      <h2 className="border-b border-gray-250 text-center text-xl font-bold mb-4">Phone verification</h2>
      {!showBtn && <p className="text-center text-gray-500 ">Enter the OTP received on {phoneNumber}</p>}
      {showBtn && <><div className="flex items-center mb-2">
  <select
    className="w-15 mr-2 bg-gray-10 rounded-l text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    defaultValue="+91"
  >
    <option value="+91">+91</option>
    <option value="+1">+1</option>
  </select>
  <input
    type="tel"
    pattern="[0-9]{10}"
    maxLength="10"
    placeholder="Enter your phone number"
    value={phoneNumber}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
  />
</div>
    <div className="flex justify-center items-center ">
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
   onClick={handleVerifyClick}>
    Verify Phone
  </button>
  </div>
      </>}
        {showOtp &&(
        <div className="flex justify-center items-center mt-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              value={digit}
              className="w-8 h-8 border-b border-gray-500 mx-2 text-center"
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              onPaste={handleOtpPaste}
            />
          ))}
        </div>
        )}
        {showOtp && <><div className="flex justify-between mt-4">
        <button className="text-blue-500 mr-4" onClick={handleChangeNumberClick}>Change number</button>
        <button className="text-blue-500" onClick={handleResendOtpClick}>Re-send OTP</button>
          </div>
          <div className="flex justify-center items-center">
          <button className="justify-center bg-green-500 hover:bg-green-700 text-white rounded-full py-2 px-4 mt-4">Verify Phone Number</button>
            </div>
            </>
          }
     </div>
    </div>
  </div>
  );
}

export default PhoneVerification;
