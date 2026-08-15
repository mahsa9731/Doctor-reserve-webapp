import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const targetEnv = process.argv[2] === 'local' ? 'MONGODB_URI_LOCAL' : 'MONGODB_URI';
const MONGODB_URI = process.env[targetEnv];

if (!MONGODB_URI) {
  console.error(' خطا: متغیر MONGODB_URI در فایل .env.local یافت نشد!');
  process.exit(1);
}

const doctorsToUpdate = [
  {
    id: "6a40e704de97e83ec34bf011", //dr-ali-rad
    slots: [
      {
        date: "چهارشنبه ۲۸ مرداد",
        times: ["۱۰:۰۰", "۱۰:۴۵", "۱۱:۳۰", "۱۲:۱۵"]
      },
      {
        date: "یکشنبه ۱ شهریور",
        times: ["۱۶:۰۰", "۱۶:۴۵", "۱۷:۳۰","۱۹:۰۰"]
      }
    ]
  },
  {
    id: "6a40e704de97e83ec34bf010", //dr-zahra-varasteh
    slots: [
      {
        date: "پنجشنبه ۲۹ مرداد",
        times: ["۰۹:۰۰", "۰۹:۳۰", "۱۰:۰۰"]
      },
      {
        date: "شنبه ۳۱ مرداد",
        times: ["۱۵:۰۰", "۱۵:۳۰", "۱۶:۰۰", "۱۶:۳۰", "۱۷:۳۰","۱۹:۰۰"]
      },
      {
        date: "یکشنبه ۱ شهریور",
        times: ["۱۱:۰۰", "۱۱:۴۵"]
      }
    ]
  },
  {
    id: "6a40e704de97e83ec34bf012", //dr-farnoosh-ghasemi
    slots: [
      {
        date: "چهارشنبه ۲۸ مرداد",
        times: ["۱۰:۰۰", "۱۰:۴۵", "۱۱:۳۰", "۱۲:۱۵"]
      },
      {
        date: "یکشنبه ۱ شهریور",
        times: ["۱۰:۳۰","۱۲:۰۰","۱۶:۰۰", "۱۶:۴۵", "۱۷:۳۰"]
      }
    ]
  },
  {
     id: "6a40e704de97e83ec34bf013", //dr-yashar-panahi
     slots: [
      {
    date: "پنجشنبه ۲۹ مرداد",
    times: ["۰۹:۰۰", "۰۹:۳۰", "۱۰:۰۰", "۱۰:۳۰", "۱۱:۰۰", "۱۱:۳۰", "۱۲:۰۰"]
  },
  {
    date: "شنبه ۳۱ مرداد",
    times: ["۰۹:۰۰", "۱۱:۰۰", "۱۱:۳۰", "۱۵:۰۰", "۱۵:۳۰", "۱۶:۰۰", "۱۶:۳۰", "۱۷:۳۰", "۱۸:۰۰"]
  },
  {
    date: "یکشنبه ۱ شهریور",
    times: ["۰۹:۰۰", "۰۹:۳۰", "۱۱:۳۰", "۱۲:۳۰", "۱۵:۰۰", "۱۵:۳۰", "۱۹:۰۰", "۱۹:۳۰", "۲۰:۰۰"]
  }
     ]
  },
  {
    id:"6a40e704de97e83ec34bf014", //dr-zahra-saadati
    slots: [
      {
    date: "پنجشنبه ۲۹ مرداد",
    times: ["۰۹:۰۰", "۰۹:۳۰", "۱۰:۰۰", "۱۰:۳۰", "۱۱:۰۰", "۱۱:۳۰", "۱۲:۰۰"]
  },
  {
    date: "شنبه ۳۱ مرداد",
    times: ["۰۹:۰۰", "۱۱:۰۰", "۱۱:۳۰", "۱۵:۰۰", "۱۵:۳۰", "۱۶:۰۰", "۱۶:۳۰", "۱۷:۳۰", "۱۸:۰۰"]
  },
  {
    date: "دوشنبه ۲ شهریور",
    times: ["۰۹:۳۰", "۱۱:۳۰", "۱۵:۰۰", "۱۵:۳۰", "۱۹:۰۰", "۱۹:۳۰", "۲۰:۰۰"]
  }
    ]
    
  },
  {
    id:"6a40e704de97e83ec34bf015", //dr-maryam-arya
    slots: [
      {
        date: "پنجشنبه ۲۹ مرداد",
        times: ["۰۹:۰۰", "۰۹:۳۰", "۱۰:۰۰","۱۱:۰۰", "۱۱:۳۰", "۱۲:۰۰"]
      },
      {
        date: "شنبه ۳۱ مرداد",
        times: ["۱۵:۰۰", "۱۵:۳۰", "۱۶:۰۰", "۱۶:۳۰", "۱۷:۳۰","۱۹:۰۰"]
      },
      {
        date: "یکشنبه ۱ شهریور",
        times: ["۱۱:۰۰", "۱۱:۴۵","۱۵:۰۰", "۱۵:۳۰", "۱۶:۰۰"]
      }
    ]
  }
  
];

const doctorSchema = new mongoose.Schema({}, { strict: false });
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

async function run() {
  try {
    console.log('در حال اتصال به دیتابیس...');
    await mongoose.connect(MONGODB_URI);
    console.log(' اتصال برقرار شد.\n');

    
    for (const item of doctorsToUpdate) {
      const result = await Doctor.updateOne(
        { _id: new mongoose.Types.ObjectId(item.id) },
        { $set: { availableSlots: item.slots } }
      );

      if (result.matchedCount === 0) {
        console.log(` پزشکی با آیدی ${item.id} یافت نشد.`);
      } else {
        console.log(` تاریخ‌های پزشک با آیدی ${item.id} با موفقیت به‌روزرسانی شد.`);
      }
    }

  } catch (error) {
    console.error(' خطا در اجرای اسکریپت:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nاتصال دیتابیس بسته شد.');
  }
}

run();