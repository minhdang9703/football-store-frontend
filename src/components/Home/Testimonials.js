import Slider from "react-slick";

const feedbacks = [
  { name: 'Văn Toàn', avatar: 'https://picsum.photos/seed/avatar1/100/100', stars: 5, comment: 'Giày siêu nhẹ, bứt tốc tuyệt vời. Giao hàng nhanh như một cơn gió!' },
  { name: 'Quang Hải', avatar: 'https://picsum.photos/seed/avatar2/100/100', stars: 5, comment: 'Shop tư vấn rất chuẩn size, đôi giày vừa khít và cho cảm giác bóng rất thật chân.' },
  { name: 'Hùng Dũng', avatar: 'https://picsum.photos/seed/avatar3/100/100', stars: 5, comment: 'Chất lượng sản phẩm không có gì để chê. Đã mua ở đây nhiều lần và sẽ tiếp tục ủng hộ.' },
  { name: 'Tiến Linh', avatar: 'https://picsum.photos/seed/avatar4/100/100', stars: 4, comment: 'Sản phẩm tốt, tuy nhiên mong shop có thêm nhiều mẫu mã hơn nữa.' },
];

function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    appendDots: dots => (
      <div>
        <ul className="m-0 p-0"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-2.5 h-2.5 bg-gray-300 rounded-full transition-all duration-300 hover:bg-primary"></div>
    )
  };

  return (
    <section className="py-12 bg-base-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary font-poppins">KHÁCH HÀNG NÓI GÌ VỀ KICKZONE</h2>
        </div>
        <Slider {...settings}>
          {feedbacks.map((fb, index) => (
            <div key={index} className="px-3">
              <div className="bg-white p-6 shadow-sm h-full flex flex-col text-center items-center">
                <img src={fb.avatar} alt={fb.name} className="w-20 h-20 rounded-full object-cover mb-4" />
                <p className="font-semibold text-secondary text-lg">{fb.name}</p>
                <div className="flex my-2">
                  {'⭐'.repeat(fb.stars)}
                  {'☆'.repeat(5 - fb.stars)}
                </div>
                <p className="text-text-muted italic">"{fb.comment}"</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Testimonials;
