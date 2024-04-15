import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

// Define address schema
const addressSchema = new Schema({
    street: { type: String, maxlength: 20 },
    city: { type: String, maxlength: 20 },
    state: { type: String, maxlength: 20 },
    country: { type: String, maxlength: 20 },
    zip: { type: String, maxlength: 20 }
});

// Define patient schema
const patientSchema = new Schema({
    prefix: String,
    firstName: { type: String, required: true, maxlength: 20 }, // Marked as required
    lastName: { type: String, required: true, maxlength: 20 }, // Marked as required
    middleInitial: { type: String, maxlength: 20 },
    dateOfBirth: Date,
    gender: { type: String, maxlength: 20 },
    cellPhone: { type: String, maxlength: 20 },
    prevNames: { type: String, maxlength: 20 },
    email: { type: String, unique: true, maxlength: 20 },
    mailAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Define models
const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);
const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

export { Address, Patient };
