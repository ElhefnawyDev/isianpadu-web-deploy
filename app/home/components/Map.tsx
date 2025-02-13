const Map = () => {
    return (
      <div className="w-full h-64 md:h-full rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d318.0060166437841!2d101.5445649!3d3.091839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4dbd8a653597%3A0xfc458d1ec475ab41!2sIsianpadu%20Systems%20Sdn.%20Bhd.!5e0!3m2!1sen!2smy!4v1694517856078!5m2!1sen!2smy"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          className="w-full h-full"
        ></iframe>
      </div>
    )
  }
  
  export default Map