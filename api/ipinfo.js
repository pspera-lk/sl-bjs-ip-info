export default async function handler(req, res) {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({
      success: false,
      message: 'Missing "ip" parameter',
      developer: 'pasindu',
      telegram: 'https://t.me/sl_bjs'
    });
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,query`);
    const data = await response.json();

    if (data.status === 'fail') {
      return res.status(404).json({
        success: false,
        message: data.message || 'Invalid IP or not found',
        developer: 'pasindu',
        telegram: 'https://t.me/sl_bjs'
      });
    }

    res.status(200).json({
      success: true,
      ip: data.query,
      country: data.country,
      region: data.regionName,
      city: data.city,
      district: data.district,
      zip: data.zip,
      lat: data.lat,
      lon: data.lon,
      timezone: data.timezone,
      offset: data.offset,
      currency: data.currency,
      isp: data.isp,
      org: data.org,
      as: data.as,
      developer: 'pasindu',
      telegram: 'https://t.me/sl_bjs'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      developer: 'pasindu',
      telegram: 'https://t.me/sl_bjs'
    });
  }
}
