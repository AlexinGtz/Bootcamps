const AWS = require('aws-sdk');
var kinesis = new AWS.Kinesis();

function getLatLon() {
    const locations = ["-73.98174286,40.71915817", "-73.98508453, 40.74716568", "-73.97333527,40.76407242", "-73.99310303,40.75263214",
    "-73.98229218,40.75133133", "-73.96527863,40.80104065", "-73.97010803,40.75979996", "-73.99373627,40.74176025", "-73.98544312,	40.73571014",
    "-73.97686005,40.68337631", "-73.9697876,40.75758362", "-73.99397278,40.74086761", "-74.00531769,40.72866058", "-73.99013519, 40.74885178",
    "-73.9595108, 40.76280975", "-73.99025726,	40.73703384", "-73.99495697,40.745121", "-73.93579865,40.70730972", "-73.99046326,40.75100708",
    "-73.9536438,40.77526093", "-73.98226166,40.75159073", "-73.98831177,40.72318649", "-73.97222137,40.67683029", "-73.98626709,40.73276901",
    "-73.97852325,	40.78910065", "-73.97612, 40.74908066", "-73.98240662,	40.73148727", "-73.98776245,40.75037384", "-73.97187042,40.75840378",
    "-73.87303925,	40.77410507", "-73.9921875,	40.73451996", "-73.98435974,40.74898529", "-73.98092651,40.74196243", "-74.00701904,40.72573853",
    "-74.00798798,	40.74022675", "-73.99419403,40.74555969", "-73.97737885,40.75883865", "-73.97051239,40.79664993", "-73.97693634,40.7599144",
    "-73.99306488,	40.73812866", "-74.00775146,40.74528885", "-73.98532867,40.74198914", "-73.99037933,40.76152802", "-73.98442078,40.74978638",
    "-73.99173737,	40.75437927", "-73.96742249,40.78820801", "-73.97813416,40.72935867", "-73.97171021,40.75943375", "-74.00737,40.7431221",
    "-73.99498749,	40.75517654", "-73.91600037,40.74634933", "-73.99924469,40.72764587", "-73.98488617,40.73621368", "-73.98627472,40.74737167"
    ];

    const randNum = Math.floor(Math.random() * 53);

	return locations[randNum]
}

function getStore() {
  const taxi = ['Y','N'];
	const randomnum = Math.round(Math.random());
	return taxi[randomnum];

}

exports.handler = async event => {
  const today = new Date();

  const records = [];
  
  for (let i = 0; i < 10; i++) {
    const record = {};
    record.id = 'id-' + i + '-' + Math.random();
    record.vendorId = Math.round(Math.random() * 2);
    record.pickupDate= today.toISOString();
    record.passengerCount = Math.floor(Math.random() * 9);
    let location = getLatLon();
    location = location.split(",");
    record.pickupLongitude=location[0];
    record.pickupLatitude=location[1];
    location = getLatLon();
    location = location.split(",");
    record.dropoffLongitude=location[0];
    record.dropoffLatitude=location[1];
    record.storeAndFwdFlag=getStore();
    const gcDistance = Math.ceil(Math.random() * 7);
    const tripDuration= Math.ceil(Math.random() * 1000);
    record.googleDistance = gcDistance;
    record.googleDuration = tripDuration;

    records.push({
      Data: JSON.stringify(record),
      PartitionKey: "id-1",
    });
  }

  await kinesis.putRecords({
    Records: records,
    StreamName: process.env.KINESIS_STREAM_NAME,
  }).promise()


  return {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": '*'},
    body: JSON.stringify("Succesfully inserted records")
    };
}

