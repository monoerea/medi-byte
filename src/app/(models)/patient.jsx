import mongoose, {Schema} from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise

const addressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
});
const patientSchema = new Schema({
        patientId: Number,
        prefix: String,
        name:  {first: String,
                last: String,
                middle: String},
        dateOfBirth: Date,
        gender: String,
        cellPhone: Number,
        prev_names: String,
        email: String,
        mailAddress: {
            type: Schema.Types.ObjectId,
            ref: 'Address'
        }
    },
    {
        virtuals:{
            fullName:{
                get(){
                    return this.name.first + ' ' + this.name.middle + ' ' + this.name.last;
                },
                set(v) {
                    const parts = v.split(' ');
                    this.name.first = parts[0];
                    this.name.middle = parts.slice(1, -1).join(' '); // Join middle names with spaces
                    this.name.last = parts[parts.length - 1];
                  }
            }
        }
    }
    );

const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);
const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

module.exports = { Address, Patient };