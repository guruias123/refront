import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Convert} from 'mongo-image-converter';
import '../../StyleSheets/dashboard.css'
import '../../StyleSheets/form.css'
import RemoveButton from '../SmartCardHelpers/RemoveButton';
import SmartCardHeading from '../SmartCardHelpers/SmartCardHeading';

const SmartCardEdit = () => {

    const {id} = useParams();
    const smartCardId = id;
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    useEffect(() => {
        if(!token) {
            navigate('/signin')
        }
        getSmartCard()
        setAllData(true)
    }, [])

    //Image
    const [image, setImage] = useState("")
    const [imgUrl, setImgUrl] = useState()
    const [updateimage, setUpdateimage] = useState()

    // Contact
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [linkedInId, setLinkedInId] = useState("");

    // Headline
    const [headline, setHeadline] = useState("");

    // Summary
    const [summary, setSummary] = useState([]);

    // Skills
    const [skills, setSkills] = useState([]);
    
    // Tech Skills
    const [techSkills, setTechSkills] = useState([]);
    
    // Experience
    const [designation, setDesignation] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyCity ,setComanyCity] = useState("");
    const [companyCountry, setCompanyCountry] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [experiences, setExperiences] = useState([]);

    // Internship
    const [internDesignation, setInternDesignation] = useState("");
    const [internCompanyName, setInternCompanyName] = useState("");
    const [internCompanyCity ,setInternCompanyCity] = useState("");
    const [internCompanyCountry, setInternCompanyCountry] = useState("");
    const [internStartDate, setInternStartDate] = useState("");
    const [internEndDate, setInternEndDate] = useState("");
    const [internships, setInternships] = useState([]);
    
    // Education
    const [degreeName, setDegreeName] = useState("");
    const [collegeName, setCollegeName] = useState("");
    const [collegeCity ,setCollegeCity] = useState("");
    const [collegeCountry, setCollegeCountry] = useState("");
    const [collegeStartDate, setCollegeStartDate] = useState("");
    const [collegeEndDate, setCollegeEndDate] = useState("");
    const [score, setScore] = useState("");
    const [educations, setEducations] = useState([]);

    // Interest
    const [interest, setInterest] = useState([]);

    // Projects
    const [projectNumber, setProjectNumber] = useState("");
    const [projectTitle, setProjectTitle] = useState("");
    const [projectStartDate, setProjectStartDate] = useState("");
    const [projectEndDate, setProjectEndDate] = useState("");
    const [projectDescription, setProjectDescription] = useState("")
    const [projects, setProjects] = useState([]);

    // Volunteers
    const [volunteerDesignation, setVolunteerDesignation] = useState("");
    const [volunteerCompanyName, setVolunteerCompanyName] = useState("");
    const [volunteerStartDate, setVolunteerStartDate] = useState("");
    const [volunteerEndDate, setVolunteerEndDate] = useState("");
    const [volunteerCompanyCity, setVolunteerCompanyCity] = useState("");
    const [volunteerCompanyCountry, setVolunteerCompanyCountry] = useState("");
    const [volunteerExperiences, setVolunteerExperiences] = useState([]);

    // HonorsAndAwards
    const [honorsAndAwards, setHonorsAndAwards] = useState([])

    // Training
    const [trainingTitle, setTrainingTitle] = useState("");
    const [trainingInstutionName, setTrainingInstutionName] = useState("");
    const [trainingCity, setTrainingCity] = useState("");
    const [trainingCountry, setTrainingCountry] = useState("");
    const [trainingStartDate, setTrainingStartDate] = useState("");
    const [trainingEndDate, setTrainingEndDate] = useState("");
    const [trainingScore, setTrainingScore] = useState("");
    const [trainings, setTrainings] = useState([]);

    // Certification
    const [certificationTitle, setCertificationTitle] = useState("");
    const [certificationInstutionName, setCertificationInstutionName] = useState("");
    const [certificationCity, setCertificationCity] = useState("");
    const [certificationCountry, setCertificationCountry] = useState("");
    const [certificationStartDate, setCertificationStartDate] = useState("");
    const [certificationEndDate, setCertificationEndDate] = useState("");
    const [certificationScore, setCertificationScore] = useState("");
    const [certifications, setCertifications] = useState([]);
    
    // License
    const [licenseName, setLicenseName] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [licenseIssuer, setLicenseIssuer] = useState("");
    const [licenseValidFrom, setLicenseValidFrom] = useState("");
    const [licenseValidTo, setLicenseValidTo] = useState("");
    const [licenses, setLicenses] = useState([])

    // Course
    const [courseTitle, setCourseTitle] = useState("");
    const [courseInstutionName, setCourseInstutionName] = useState("");
    const [courseCity, setCourseCity] = useState("");
    const [courseCountry, setCourseCountry] = useState("");
    const [courseStartDate, setCourseStartDate] = useState("");
    const [courseEndDate, setCourseEndDate] = useState("");
    const [courseScore, setCourseScore] = useState("");
    const [courses, setCourses] = useState([]);

    // Patent
    const [patentTitle, setPatentTitle] = useState("");
    const [patentNumber, setPatentNumber] = useState("");
    const [patentStatus, setPatentStatus] = useState("");
    const [patents, setPatents] = useState([]);

    // Publication
    const [publicationName, setPublicationName] = useState("");
    const [publicationDate, setPublictionDate] = useState("");
    const [publications, setPublications] = useState([]);

    // Workshop
    const [workshopDesignation, setWorkshopDesignation] = useState("");
    const [workshopCompanyName, setWorkshopCompanyName] = useState("");
    const [workshopStartDate, setWorkshopStartDate] = useState("");
    const [workshopEndDate, setWorkshopEndDate] = useState("");
    const [workshopCompanyCity, setWorkshopCompanyCity] = useState("");
    const [workshopCompanyCountry, setWorkshopCompanyCountry] = useState("");
    const [workshops, setWorkshops] = useState([]);

    // Reference
    const [referenceName, setReferenceName] = useState("");
    const [referenceDesignation, setReferenceDesignation] = useState("");
    const [referenceCompany, setReferenceCompany] = useState("");
    const [referenceEmail, setReferenceEmail] = useState("");
    const [references, setReferences] = useState([]);

    // Personal Details
    const [languageKnown, setLanguageKnown] = useState([]);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [nationality, setNationality] = useState("");
    const [passport, setPassport] = useState("");

    //loading
    const [allData, setAllData] = useState(false)

    const getSmartCard = async() => {
        const headers = {
            authorization: `Bearer ${token}`
        }
         try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/get-unique-smartcard/${smartCardId}`, {headers})
            console.log({data});
            if(data.success) {
                console.log({smartCard: data.smartCard})
                // loading
                setAllData(data)
                //Image
                setImage(data.smartCard.fileName)
                console.log(data.smartCard.fileName);
                // Contact
                let cont = data.smartCard.contact;
                setFirstName(cont.firstName);
                setLastName(cont.lastName);
                setEmail(cont.email);
                setPhone(cont.phone);
                setAddress(cont.address);
                setLinkedInId(cont.linkedinId)
                // Headline
                setHeadline(data.smartCard.headline)
                // Summary
                let summ = data.smartCard.summary;
                setSummary(summ)
                // Skills
                let ski = data.smartCard.skills;
                setSkills(ski)
                // Tech Skills
                let tSki = data.smartCard.techSkills;
                setTechSkills(tSki)
                // console.log(tSki);
                // Experiences
                let exp = data.smartCard.experiences;
                setExperiences(exp)
                // Internship
                let interns = data.smartCard.internships;
                setInternships(interns);
                // Educations
                let edus = data.smartCard.educations;
                setEducations(edus);
                // Projects
                let pros = data.smartCard.projects;
                setProjects(pros);
                // Interest
                setInterest(data.smartCard.interest)
                // Volunteer Experience
                let volunteerExp = data.smartCard.volunteerExperiences;
                setVolunteerExperiences(volunteerExp);
                // Honors And Awards
                let honAndAw = data.smartCard.honorsAndAwards;
                setHonorsAndAwards(honAndAw);
                // Trainings
                let trains = data.smartCard.trainings;
                setTrainings(trains);
                // Certification
                let certs = data.smartCard.certifications;
                setCertifications(certs);
                // License
                let licen = data.smartCard.licenses;
                console.log(licen);
                // setLicenseName(licen.name);
                // setLicenseNumber(licen.number);
                // setLicenseValidFrom(licen.validFrom);
                // setLicenseIssuer(licen.issuer);
                // setLicenseValidTo(licen.validTill);
                setLicenses(licen)
                // Course
                let cours = data.smartCard.courses;
                setCourses(cours);
                console.log("co log");
                // Patent
                let patens = data.smartCard.patents;
                setPatents(patens);
                // Publicatons
                let publicas = data.smartCard.publications;
                setPublications(publicas)
                // Workshop
                let wshops = data.smartCard.workshops;
                setWorkshops(wshops);
                // References
                let referens = data.smartCard.references;
                setReferences(referens);
                // Personnal Details
                let perDetails = data.smartCard.personalDetails;
                setLanguageKnown(perDetails.languageKnown);
                setDateOfBirth(perDetails.dateOfBirth);
                setNationality(perDetails.nationality);
                setPassport(perDetails.passport);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const addExperience = (e) => {
        e.preventDefault();
        if(designation != '' && companyName != '' && companyCity != "" && companyCountry != '' && startDate != '' && endDate != '') {
            setExperiences(prev => [...prev , {designation, companyName, city: companyCity, country: companyCountry, startedAt: startDate, endedAt: endDate}]);
            setDesignation('');
            setCompanyName('');
            setComanyCity('');
            setCompanyCountry('');
            setStartDate('');
            setEndDate('');
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removeExperience = (e,index) => {
        e.preventDefault()
        // setExperiences(experiences.slice(0, -1));
        console.log(index);
        const newItems = [...experiences]; // make a copy of the array
        newItems.splice(index, 1); // remove the item at the specified index
        console.log(newItems);
        setExperiences(newItems);
        
    }

    const addIntership = (e) => {
        e.preventDefault();
        if(internDesignation != '' && internCompanyName != '' && internCompanyCity != "" && internCompanyCountry != '' && internStartDate != '' && internEndDate != '' ) {
            setInternships(prev => [...prev , {designation: internDesignation, companyName: internCompanyName, city: internCompanyCity, country: internCompanyCountry, startedAt: internStartDate, endedAt: internEndDate}]);
            setInternDesignation('');
            setInternCompanyName('');
            setInternCompanyCity('');
            setInternCompanyCountry('');
            setInternStartDate('');
            setInternEndDate('');
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removeInternship = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...internships]; // make a copy of the array
        newItems.splice(index, 1); // remove the item at the specified index
        console.log(newItems);
            setInternships(newItems);
    }

    const addEducation = (e) => {
        e.preventDefault();
        console.log("edu running");
        if(degreeName != '' && collegeName != '' && collegeCity != "" && collegeCountry != '' && collegeStartDate != '' && collegeEndDate != '' && score != "") {
            setEducations(prev => [...prev , {degreeName, collegeName, city: collegeCity, country: collegeCountry, startedAt: collegeStartDate, endedAt: collegeEndDate, score: score}]);
            setDegreeName('');
            setCollegeName('');
            setCollegeCity('');
            setCollegeCountry('');
            setCollegeStartDate('');
            setCollegeEndDate('');
            setScore("");
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removeEducation = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...educations]; 
        newItems.splice(index, 1); 
        console.log(newItems);
            setEducations(newItems);
    }

    const addProject = (e) => {
        e.preventDefault();
        if(projectNumber != '' && projectTitle != '' && projectStartDate != "" && projectEndDate != '' && projectDescription !="") {
            setProjects(prev => [...prev , {number: projectNumber, title: projectTitle, startedAt: projectStartDate, endedAt: projectEndDate, projectDescription: projectDescription}]);
            setProjectNumber('');
            setProjectTitle('');
            setProjectStartDate('');
            setProjectEndDate('');
            setScore("")
            setProjectDescription('')
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removeProject = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...projects]; 
        newItems.splice(index, 1); 
        console.log(newItems);
            setProjects(newItems);
    }

    const addVolunteers = (e) => {
        e.preventDefault();
        if(volunteerDesignation != '' && volunteerCompanyName != '' && volunteerStartDate != "" && volunteerEndDate != '' && volunteerCompanyCity != '' && volunteerCompanyCountry != "") {
            setVolunteerExperiences(prev => [...prev , {designation: volunteerDesignation, companyName: volunteerCompanyName, startedAt: volunteerStartDate, endedAt: volunteerEndDate, city: volunteerCompanyCity, country: volunteerCompanyCountry}]);
            setVolunteerDesignation("");
            setVolunteerCompanyName('');
            setVolunteerStartDate('');
            setVolunteerEndDate('');
            setVolunteerCompanyCity('');
            setVolunteerCompanyCountry("");
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removeVolunteers = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...volunteerExperiences]; 
        newItems.splice(index, 1); 
        console.log(newItems);
            setVolunteerExperiences(newItems);
    }

    const addTraining = (e) => {
        e.preventDefault();
        if(trainingInstutionName != '' && trainingTitle != '' && trainingCity != "" && trainingCountry != '' && trainingStartDate != '' && trainingEndDate != '' && trainingScore != '') {
            setTrainings(prev => [...prev , {institutionName: trainingInstutionName, title: trainingTitle, startedAt: trainingStartDate, endedAt: trainingEndDate, city: trainingCity, country: trainingCountry, score: trainingScore}]);
            setTrainingTitle('');
            setTrainingInstutionName('');
            setTrainingCity('');
            setTrainingCountry('');
            setTrainingStartDate('');
            setTrainingEndDate('');
            setTrainingScore('');
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removeTraining = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...trainings]; 
        newItems.splice(index, 1); 
        console.log(newItems);
            setTrainings(newItems);
    }


    const addCertification = (e) => {
        e.preventDefault();
        if(certificationInstutionName != '' && certificationTitle != '' && certificationCity != "" && certificationCountry != '' && certificationStartDate != '' && certificationEndDate != '' && certificationScore != '') {
            setCertifications(prev => [...prev , {institutionName: certificationInstutionName, title: certificationTitle, startedAt: certificationStartDate, endedAt: certificationEndDate, city: certificationCity, country: certificationCountry, score: certificationScore}]);
            setCertificationTitle('');
            setCertificationInstutionName('');
            setCertificationCity('');
            setCertificationCountry('');
            setCertificationStartDate('');
            setCertificationEndDate('');
            setCertificationScore('');
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removeCertification = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...certifications]; 
        newItems.splice(index, 1); 
        console.log(newItems);
            setCertifications(newItems);
        
    }

    const addLicense = (e) =>{
        e.preventDefault();
        if(licenseName != '' && licenseNumber != '' && licenseIssuer != "" && licenseValidFrom != '' && licenseValidTo != '') {
            setLicenses(prev => [...prev , {name: licenseName, number: licenseNumber, issuer: licenseIssuer, validFrom: licenseValidFrom, validTill: licenseValidTo}]);
            setLicenseName('');
            setLicenseNumber('');
            setLicenseIssuer('');
            setLicenseValidFrom('');
            setLicenseValidTo('');
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removeLicense = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...licenses]; 
        newItems.splice(index, 1); 
        console.log(newItems);
            setLicenses(newItems);
        
    }

    const addCourse = (e) => {
        e.preventDefault();
        if(courseInstutionName != '' && courseTitle != '' && courseCity != "" && courseCountry != '' && courseStartDate != '' && courseEndDate != '' && courseScore != '') {
            setCourses(prev => [...prev , {institutionName: courseInstutionName, title: courseTitle, startedAt: courseStartDate, endedAt: courseEndDate, city: courseCity, country: courseCountry, score: courseScore}]);
            setCourseTitle('');
            setCourseInstutionName('');
            setCourseCity('');
            setCourseCountry('');
            setCourseStartDate('');
            setCourseEndDate('');
            setCourseScore('');
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removeCourse = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...courses]; 
        newItems.splice(index, 1); 
        console.log(newItems);
            setCourses(newItems);
        
    }

    const addPublication = (e) => {
        e.preventDefault();
        if(publicationName != '' && publicationDate != "" ) {
            setPublications(prev => [...prev , {title: publicationName, date: publicationDate}]);
            setPublicationName("");
            setPublictionDate("");
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removePublication = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...publications]; 
        newItems.splice(index, 1); 
        console.log(newItems);
            setPublications(newItems);
        
    }

    const addWorkshops = (e) => {
        e.preventDefault();
        if(workshopDesignation != '' && workshopCompanyName != '' && workshopStartDate != "" && workshopEndDate != '' && workshopCompanyCity != '' && workshopCompanyCountry != "" ) {
            setWorkshops(prev => [...prev , {designation: workshopDesignation, companyName: workshopCompanyName, startedAt: workshopStartDate, endedAt: workshopEndDate, city: workshopCompanyCity, country: workshopCompanyCountry}]);
            setWorkshopDesignation("");
            setWorkshopCompanyName('');
            setWorkshopStartDate('');
            setWorkshopEndDate('');
            setWorkshopCompanyCity('');
            setWorkshopCompanyCountry("");
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removeWorkshops = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...workshops]; 
        newItems.splice(index, 1); 
        console.log(newItems);
            setWorkshops(newItems);
        
    }

    const addReference = (e) => {
        e.preventDefault();
        if(referenceName != '' && referenceDesignation!= '' && referenceCompany != "" && referenceEmail != "") {
            setReferences(prev => [...prev , {name: referenceName, designation: referenceDesignation, company: referenceCompany, email: referenceEmail}]);
            setReferenceName("");
            setReferenceDesignation("");
            setReferenceEmail("");
            setReferenceCompany("");
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removeReference = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...references]; 
        newItems.splice(index, 1); 
        console.log(newItems);
            setReferences(newItems);
        
    }

    const addPatent = (e) => {
        e.preventDefault();
        if(patentTitle != '' && patentNumber != '' && patentStatus != "") {
            setPatents(prev => [...prev , {title: patentTitle, number: patentNumber, status: patentStatus}]);
            setPatentTitle("");
            setPatentNumber("");
            setPatentStatus("");
        } else {
            console.log('please fill missing details')
            alert('please fill missing details')
        }
    }

    const removePatent = (e,index) => {
        e.preventDefault()
        console.log(index);
        const newItems = [...patents]; 
        newItems.splice(index, 1); 
        console.log(newItems);
            setPatents(newItems);
        
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        if(designation != '' && companyName != '' && companyCity != "" && companyCountry != '' && startDate != '' && endDate != '') {
            experiences.push({designation, companyName, city: companyCity, country: companyCountry, startedAt: startDate, endedAt: endDate});
        }
        if(internDesignation != '' && internCompanyName != '' && internCompanyCity != "" && internCompanyCountry != '' && internStartDate != '' && internEndDate != '' ) {
            internships.push({designation: internDesignation, companyName: internCompanyName, city: internCompanyCity, country: internCompanyCountry, startedAt: internStartDate, endedAt: internEndDate});
        }
        if(degreeName != '' && collegeName != '' && collegeCity != "" && collegeCountry != '' && collegeStartDate != '' && collegeEndDate != '' && score != "") {
            educations.push({degreeName, collegeName, city: collegeCity, country: collegeCountry, startedAt: collegeStartDate, endedAt: collegeEndDate, score: score})
        }
        if(projectNumber != '' && projectTitle != '' && projectStartDate != "" && projectEndDate != '') {
            projects.push({number: projectNumber, title: projectTitle, startedAt: projectStartDate, endedAt: projectEndDate});
        }
        if(volunteerDesignation != '' && volunteerCompanyName != '' && volunteerStartDate != "" && volunteerEndDate != '' && volunteerCompanyCity != '' && volunteerCompanyCountry != "") {
            volunteerExperiences.push({designation: volunteerDesignation, companyName: volunteerCompanyName, startedAt: volunteerStartDate, endedAt: volunteerEndDate, city: volunteerCompanyCity, country: volunteerCompanyCountry});
        }
        if(trainingInstutionName != '' && trainingTitle != '' && trainingCity != "" && trainingCountry != '' && trainingStartDate != '' && trainingEndDate != '' && trainingScore != '') {
            trainings.push({institutionName: trainingInstutionName, title: trainingTitle, startedAt: trainingStartDate, endedAt: trainingEndDate, city: trainingCity, country: trainingCountry, score: trainingScore});
        }
        if(certificationInstutionName != '' && certificationTitle != '' && certificationCity != "" && certificationCountry != '' && certificationStartDate != '' && certificationEndDate != '' && certificationScore != '') {
            certifications.push({institutionName: certificationInstutionName, title: certificationTitle, startedAt: certificationStartDate, endedAt: certificationEndDate, city: certificationCity, country: certificationCountry, score: certificationScore});
        }
        if(licenseName != '' && licenseNumber != '' && licenseIssuer != '' && licenseValidFrom != '' && licenseValidTo != ''){
            licenses.push({name: licenseName, number: licenseNumber, issuer: licenseIssuer, validFrom: licenseValidFrom, validTill: licenseValidTo})
        }
        if(courseInstutionName != '' && courseTitle != '' && courseCity != "" && courseCountry != '' && courseStartDate != '' && courseEndDate != '' && courseScore != '') {
            courses.push({institutionName: courseInstutionName, title: courseTitle, startedAt: courseStartDate, endedAt: courseEndDate, city: courseCity, country: courseCountry, score: courseScore});
        }
        if(patentTitle != '' && patentNumber != "" && patentStatus != '') {
            patents.push({title: patentTitle, number: patentNumber, status: patentStatus});
        }
        if(publicationName != '' && publicationDate != "") {
            publications.push({title: publicationName, date: publicationDate});
        }
        if(workshopDesignation != '' && workshopCompanyName != '' && workshopStartDate != "" && workshopEndDate != '' && workshopCompanyCity != '' && workshopCompanyCountry != "") {
            workshops.push({designation: workshopDesignation, companyName: workshopCompanyName, startedAt: workshopStartDate, endedAt: workshopEndDate, city: workshopCompanyCity, country: workshopCompanyCountry});
        }
        if(referenceName != '' && referenceDesignation!= '' && referenceCompany != "" && referenceEmail != "") {
            references.push({name: referenceName, designation: referenceDesignation, company: referenceCompany, email: referenceEmail});
        }
        console.log(trainings);
        const headers = {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        }
        let convertedImage;
        if(updateimage){
        convertedImage = await Convert(updateimage)}
        else{
            convertedImage=image
        }
            const d = {
                fileName:convertedImage,
                // fileName1:'',
            contact: {
                firstName,
                lastName,
                email,
                phone,
                address,
                linkedinId: linkedInId
            },
            headline,
            summary,
            skills,
            techSkills,
            experiences,
            internships,
            educations,
            interest,
            projects,
            volunteerExperiences,
            honorsAndAwards,
            trainings,
            certifications,
            // license: {
            //     name: licenseName,
            //     number: licenseNumber,
            //     validFrom: licenseValidFrom,
            //     validTill: licenseValidTo,
            //     issuer: licenseIssuer
            // },
            licenses,
            courses,
            patents,
            publications,
            workshops,
            references,
            personalDetails: {
                languageKnown,
                dateOfBirth,
                nationality,
                passport
            }
        }
        console.log({d});
        try {
            // /dashboard/smart-card/${SmartCardId}
            // ${process.env.REACT_APP_API}/update-smartCard/${smartCardId}
            const {data} = await axios.put(`${process.env.REACT_APP_API}/update-smartCard/${smartCardId}`, d, {headers});
            console.log({data})
            if (data.success) {
                // /dashboard/smart-card-home/${data.smartCard._id}
                // /dashboard/smart-card/${data.smartCard._id}
                setIsSubmitting(true)
            
                navigate(`/dashboard/smart-card-home/${data.smartCard._id}`);
                
            }
        } catch (error) {
            console.log(error)
        }
    }                                                                                           
    const changeSummary = (val) => {
        let summaryArr = val.split("\n")
        setSummary(summaryArr);
    }                                                                                              
    const changeSkill = (val) => {
        let skillArr = val.split("\n")
        console.log(skillArr);
        setSkills(skillArr);
    }                                                                                              
    const changeTechSkill = (val) => {
        let techSkillArr = val.split("\n")
        setTechSkills(techSkillArr);
    }  
                                                                                                                                                                              
    const changeInterest = (val) => {
        let interestArr = val.split("\n")
        setInterest(interestArr);
    }    
    const changeHonorAndAwards = (val) => {
        let arr = val.split("\n");
        setHonorsAndAwards(arr);
    }                                                                                         
    const changeknownLanguages = (val) => {
        let arr = val.split("\n");
        console.log(arr);
        setLanguageKnown(arr);
    }
    
    const experienceHandleChange = (e, index) => {
        let data = [...experiences];
        console.log({data});
        data[index][e.target.name] = e.target.value;
        setExperiences(data)    
    }

    const internshipHandleChange = (e, index) => {
        let data = [...internships];
        console.log({data});
        data[index][e.target.name] = e.target.value;
        setInternships(data)    
    }

    const educationHandleChange = (e, index) => {
        let data = [...educations];
        data[index][e.target.name] = e.target.value;
        console.log({data})
        setEducations(data)
    }

    const projectHandleChange = (e, index) => {
        let data = [...projects];
        data[index][e.target.name] = e.target.value;
        setProjects(data)
    }

    const volunteerHandleChange = (e, index) => {
        let data = [...volunteerExperiences];
        console.log({data});
        data[index][e.target.name] = e.target.value;
        setVolunteerExperiences(data)    
    }

    const trainingChangeHandler = (e, index) => {
        let data = [...trainings];
        data[index][e.target.name] = e.target.value;
        console.log({data});
        setTrainings(data)
    }
    const certificationChangeHandler = (e, index) => {
        let data = [...certifications];
        data[index][e.target.name] = e.target.value;
        console.log({data});
        setCertifications(data)
    }
    const courseChangeHandler = (e, index) => {
        let data = [...courses];
        data[index][e.target.name] = e.target.value;
        console.log({data});
        setCourses(data);
    }
    const patentHandleChange = (e, index) => {
        let data = [...patents];
        console.log({data});
        console.log(e.target.value);
        [index][e.target.name] = e.target.value;
        setPatents(data)    
    }
    const publicationHandleChange = (e, index) => {
        let data = [...publications];
        console.log({data});
        data[index][e.target.name] = e.target.value;
        setPublications(data)    
    }
    const workshopHandleChange = (e, index) => {
        let data = [...workshops];
        console.log({data});
        [index][e.target.name] = e.target.value;
        setWorkshops(data)    
    }
    const referenceHandleChange = (e, index) => {
        let data = [...references];
        data[index][e.target.name] = e.target.value;
        console.log({data});
        setReferences(data);   
    }
    const handleImage = (e) => {
        if(e.target.files[0].name.includes('.png') || e.target.files[0].name.includes('.jpg') || e.target.files[0].name.includes('.jpeg')){
        setUpdateimage(e.target.files[0] )
        console.log(e.target.files[0].name);
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        setImgUrl(imageUrl)
    }
        else{
            alert('select valid profile type')
            e.target.value = null; // reset the file input field
            setImgUrl(null); // clear the image URL state
        }
    }
    const licenseHandleChange = (e, index) => {
        let data = [...licenses];
        data[index][e.target.name] = e.target.value;
        console.log({data});
        setLicenses(data);   
    } 

// loading
const [isSubmitting, setIsSubmitting] = useState(false);
    return ( 
           
        <div className="Resume">
             {allData && allData === true ? 
        <p >Loading ....</p>
        :
            <form onSubmit={(e) => handleSubmit(e)}>
                            {isSubmitting && <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif" alt="Loading..." />}

                <h4>Profile</h4>
                <img src={imgUrl ? imgUrl : image  } />
                <input accept="image/*" style={{"color":"#fff"}} type='file' onChange = {(e) => handleImage(e) } />
                <h4>Contact</h4>
                    <div className="row">
                        <div className="col-20">
                            <label for="fname">First Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="fname" name="firstname" placeholder="Your First Name.." value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="lname">Last Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="lname" name="lastname" placeholder="Your Last Name.." value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                    </div>  
                    <div className="row">
                        <div className="col-20">
                            <label for="email">Email</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="email" id="email" name="email" placeholder="Your Email.." value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="phone">Phone</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="number" id="phone" name="phone" placeholder="Your Phone.." value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                    </div>
                    {/* Address */}
                    {/* <div className="row">
                        <div className="col-20">
                            <label for="address">Address</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="address" name="address" placeholder="Your Address.." value={address} onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-20">
                            <label for="Linked Id">Linkedin Id</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="linkedInId" name="linkedInId" placeholder="Your Linkedin id.." value={linkedInId} onChange={(e) => setLinkedInId(e.target.value)}/>
                        </div>
                    </div>
                    
                    {/* Headline */}
                    <div className="row">
                        <div className="col-20">
                            <label for="summary">Headline</label>
                        </div>
                        <div className="col-75">
                            <textarea type="text" id="summary" name="headline" placeholder="Your Headline" value={headline} onChange={(e) => setHeadline(e.target.value)}/>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="row">
                        <div className="col-20">
                            <label for="summary">Summary</label>
                        </div>
                        <div className="col-75">
                            <textarea type="text" id="summary" name="summary" placeholder="Your Summary" value={summary.join('\n')} onChange={(e) => changeSummary(e.target.value)}/>
                        </div>
                    </div>

                     {/* Skills */}
                     <div className="row">
                        <div className="col-20">
                            <label for="skills">Skills</label>
                        </div>
                        <div className="col-75">
                            <textarea type="text" id="skills" name="skills" placeholder="Your Skills" value={skills?.join('\n')} onChange={(e) => changeSkill(e.target.value)}/>
                        </div>
                    </div>

                    {/* Tech Skills */}
                    <div className="row">
                        <div className="col-20">
                            <label for="techSkills">Tech Skills</label>
                        </div>
                        <div className="col-75">
                            <textarea type="text" id="techSkills" name="techSkills" placeholder="Your Tech Skills" value={techSkills?.join('\n')} onChange={(e) => changeTechSkill(e.target.value)}/>
                        </div>
                    </div>

                    {/* Experience */}
                    <h4>Experience</h4>
                    {/* <SmartCardHeading heading='Experience' handleSubmit={addExperience} /> */}
                    {experiences.map((experience, index) => {
                        return (
                            <span className='sections' key={index}>
                             <RemoveButton heading={`Experience ${index+1}`}  index={index}  />
                                <div className="row">
                                    <div className="col-20">
                                        <label for="designation">Designation</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="designation" name="designation" placeholder="Your Designation" value={experience.designation} onChange={(e) => experienceHandleChange(e, index)}/>
                                    </div>
                                 </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="companyName">Company Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="companyName" name="companyName" placeholder="Your Company Name" value={experience.companyName} onChange={(e) => experienceHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="startedAt">Start Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startedAt" placeholder="Your start date" value={experience.startedAt} onChange={(e) => experienceHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="endDate">End Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max="9999-12-31" id="endedAt" name="endedAt" placeholder="Your end date" value={experience.endedAt} onChange={(e) => experienceHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="companyCity">Company City</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="companyCity" name="city" placeholder="Your Company City" value={experience.city} onChange={(e) => experienceHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="companyCountry">Company Country</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="companyCountry" name="country" placeholder="Your Country" value={experience.country} onChange={(e) => experienceHandleChange(e, index)}/>
                                    </div>
                                    <div className='col-75 remove_button'>
                                    <RemoveButton  content="Remove" index={index} handleSubmit={removeExperience} />
                                </div>
                                </div>
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removeExperience} /> */}
                            </span>
                        )
                    })}

                    <div className="row">
                        <div className="col-20">
                            <label for="designation">Designation</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="designation" name="designation" placeholder="Your Designation" value={designation} onChange={(e) => setDesignation(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="companyName">Company Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="companyName" name="companyName" placeholder="Your Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="startDate">Start Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startDate" placeholder="Your start date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="endDate">End Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endDate" placeholder="Your end date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="companyCity">Company City</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="companyCity" name="companyCity" placeholder="Your Company City" value={companyCity} onChange={(e) => setComanyCity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="companyCountry">Company Country</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="companyCountry" name="companyCountry" placeholder="Your Country" value={companyCountry} onChange={(e) => setCompanyCountry(e.target.value)}/>
                        </div>
                    </div>
                    <SmartCardHeading handleSubmit={addExperience} />

                    {/* <div className="row">
                        <div className="col-20" >
                            <i className="fa fa-plus" aria-hidden="true" style={{fontSize: "2rem", color: 'var(--secondary-color)'}} onClick={(e) => addExperience(e)}></i>
                        </div>
                    </div> */}

                     {/* Internship */}
                    <h4>Internship</h4>
                    {/* <SmartCardHeading heading='Internship' handleSubmit={addIntership} /> */}
                    {internships.map((internship, index) => {
                        return (
                            <span className='sections' key={index}>
                            <RemoveButton heading={`Internship ${index+1}`} index={index}  />
                                <div className="row">
                                    <div className="col-20">
                                        <label for="designation">Designation</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="designation" name="designation" placeholder="Your Designation" value={internship.designation} onChange={(e) => internshipHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="companyName">Company Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="companyName" name="companyName" placeholder="Your Company Name" value={internship.companyName} onChange={(e) => internshipHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="startDate">Start Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startedAt" placeholder="Your start date" value={internship.startedAt} onChange={(e) => internshipHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="endDate">End Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endedAt" placeholder="Your end date" value={internship.endedAt} onChange={(e) => internshipHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="companyCity">Company City</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="city" name="city" placeholder="Your Company City" value={internship.city} onChange={(e) => internshipHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="companyCountry">Company Country</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="companyCountry" name="country" placeholder="Your Country" value={internship.country} onChange={(e) => internshipHandleChange(e, index)}/>
                                    </div>
                                    <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removeInternship} />                          
                                </div>
                                </div>
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removeInternship} />  */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="designation">Designation</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="designation" name="designation" placeholder="Your Designation" value={internDesignation} onChange={(e) => setInternDesignation(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="companyName">Company Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="companyName" name="companyName" placeholder="Your Company Name" value={internCompanyName} onChange={(e) => setInternCompanyName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="startDate">Start Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startDate" placeholder="Your start date" value={internStartDate} onChange={(e) => setInternStartDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="endDate">End Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endDate" placeholder="Your end date" value={internEndDate} onChange={(e) => setInternEndDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="companyCity">Company City</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="companyCity" name="companyCity" placeholder="Your Company City" value={internCompanyCity} onChange={(e) => setInternCompanyCity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="companyCountry">Company Country</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="companyCountry" name="companyCountry" placeholder="Your Country" value={internCompanyCountry} onChange={(e) => setInternCompanyCountry(e.target.value)}/>
                        </div>
                    </div>
                    <SmartCardHeading handleSubmit={addIntership} />

                    {/* <div className="row">
                        <div className="col-20" >
                            <i className="fa fa-plus" aria-hidden="true" style={{fontSize: "2rem", color: 'var(--secondary-color)'}} onClick={(e) => addIntership(e)}></i>
                        </div>
                    </div> */}

                   {/* Education */}
                    <h4>Education</h4>
                    {/* <SmartCardHeading heading='Education' handleSubmit={addEducation} /> */}
                    {educations.map((education, index) => {
                        return (
                            <span className='sections' key={index}>
                            <RemoveButton heading={`Education ${index+1}`} index={index} />
                                <div className="row">
                                    <div className="col-20">
                                        <label for="degree">Degree</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="degree" name="degreeName" placeholder="Your Degree" value={education.degreeName} onChange={(e) => educationHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="companyName">College/University Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="companyName" name="collegeName" placeholder="Your college name" value={education.collegeName} onChange={(e) => educationHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="startDate">Start Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startedAt" placeholder="Your start date" value={education.startedAt} onChange={(e) => educationHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="endDate">End Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endedAt" placeholder="Your end date" value={education.endedAt} onChange={(e) => educationHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="collegeCity">College City</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="collegeCity" name="city" placeholder="Your College City" value={education.city} onChange={(e) => educationHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="companyCountry">College Country</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="companyCountry" name="country" placeholder="Your Country" value={education.country} onChange={(e) => educationHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="score">Score</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="score" name="score" placeholder="Your Score" value={education.score} onChange={(e) => educationHandleChange(e, index)}/>
                                    </div>
                                    <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removeEducation} /> 
                                </div>
                                </div>
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removeEducation} /> */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="degree">Degree</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="degree" name="degree" placeholder="Your Degree" value={degreeName} onChange={(e) => setDegreeName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="companyName">College/University Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="companyName" name="companyName" placeholder="Your College/University Name" value={collegeName} onChange={(e) => setCollegeName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="startDate">Start Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startedAt" placeholder="Your start date" value={collegeStartDate} onChange={(e) => setCollegeStartDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="endDate">End Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endDatedAt" placeholder="Your end date" value={collegeEndDate} onChange={(e) => setCollegeEndDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="collegeCity">College City</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="collegeCity" name="city" placeholder="Your College City" value={collegeCity} onChange={(e) => setCollegeCity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="companyCountry">College Country</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="companyCountry" name="country" placeholder="Your Country" value={collegeCountry} onChange={(e) => setCollegeCountry(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="score">Score</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="score" name="score" placeholder="Your Score" value={score} onChange={(e) => setScore(e.target.value)}/>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-20" >
                            <i className="fa fa-plus" aria-hidden="true" style={{fontSize: "2rem", color: 'var(--secondary-color)'}} onClick={(e) => addEducation(e)}></i>
                        </div>
                </div>   */}
                                                                                  
                    <SmartCardHeading handleSubmit={addEducation} />

                    {/* Interest */}
                    <h4>Interest</h4>
                    <div className="row">
                        <div className="col-20">
                            <label for="score">Interest</label>
                        </div>
                        <div className="col-75">
                            <textarea type="text" id="score" name="score" placeholder="Your interest" value={interest.join('\n')} onChange={(e) => changeInterest(e.target.value)}/>
                        </div>
                    </div>

                    {/* Projects */}
                    <h4>Project</h4>
                    {/* <SmartCardHeading heading='Project' handleSubmit={addProject} /> */}
                    {projects.map((project, index) => {
                        return (
                            <span className='sections'>
                            <RemoveButton heading={`Project ${index+1}`} index={index}  />
                                <div className="row">
                                    <div className="col-20">
                                        <label for="projectNumber">Project Number</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="projectNumber" name="number" placeholder="Your Project Number" value={project.number} onChange={(e) => projectHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="projectTitle">Project Title</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="projectTitle" name="title" placeholder="Your Project Title" value={project.title} onChange={(e) => projectHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="startDate">Start Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startedAt" placeholder="Your start date" value={project.startedAt} onChange={(e) => projectHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="endDate">End Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endedAt" placeholder="Your end date" value={project.endedAt} onChange={(e) => projectHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                        <div className="col-20">
                            <label for="endDate">Project Description</label>
                        </div>
                        <div className="col-75">
                            <textarea autoComplete="off" type="text" id="description" name="description" placeholder="Project Description" value={project.projectDescription} onChange={(e) => setProjectDescription(e.target.value)}/>
                        </div>
                        <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removeProject} /> 
                                </div>
                    </div>
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removeProject} />  */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="projectNumber">Project Number</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="projectNumber" name="projectNumber" placeholder="Your Project Number" value={projectNumber} onChange={(e) => setProjectNumber(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="projectTitle">Project Title</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="projectTitle" name="projectTitle" placeholder="Your Project Title" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="startDate">Start Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startDate" placeholder="Your start date" value={projectStartDate} onChange={(e) => setProjectStartDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="endDate">End Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endDate" placeholder="Your end date" value={projectEndDate} onChange={(e) => setProjectEndDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="endDate">Project Description</label>
                        </div>
                        <div className="col-75">
                            <textarea autoComplete="off" type="text" id="description" name="description" placeholder="Project Description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}/>
                        </div>
                    </div>
                    <SmartCardHeading handleSubmit={addProject} />



                    {/* Volunteer Experience */}
                    <h4>Volunteer Experience</h4>
                    {/* <SmartCardHeading heading='Volunteer Experience' handleSubmit={addVolunteers} /> */}
                    {volunteerExperiences?.map((volunteer, index) => {
                        return (
                            <span className='sections' key={index}>
                            <RemoveButton heading={`Volunteer Experience ${index+1}`} index={index}  />
                                <div className="row">
                                    <div className="col-20">
                                        <label for="projectNumber">Designation</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="projectNumber" name="designation" placeholder="Your Designation" value={volunteer.designation} onChange={(e) => volunteerHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="projectTitle">Company Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="projectTitle" name="companyName" placeholder="Your Company Name" value={volunteer.companyName} onChange={(e) => volunteerHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="startDate">Start Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startedAt" placeholder="Your start date" value={volunteer.startedAt} onChange={(e) => volunteerHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="endDate">End Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endedAt" placeholder="Your end date" value={volunteer.endedAt} onChange={(e) => volunteerHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="city">City</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="description" name="city" placeholder="Volunteer City" value={volunteer.city} onChange={(e) => volunteerHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="country">Country</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="description" name="country" placeholder="Volunteer Country" value={volunteer.country} onChange={(e) => volunteerHandleChange(e, index)}/>
                                    </div>
                                    <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removeVolunteers} />
                                </div>
                                </div>
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removeVolunteers} /> */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="projectNumber">Designation</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="projectNumber" name="projectNumber" placeholder="Your Designation" value={volunteerDesignation} onChange={(e) => setVolunteerDesignation(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="projectTitle">Company Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="projectTitle" name="projectTitle" placeholder="Your Company Name" value={volunteerCompanyName} onChange={(e) => setVolunteerCompanyName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="startDate">Start Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startDate" placeholder="Your start date" value={volunteerStartDate} onChange={(e) => setVolunteerStartDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="endDate">End Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endDate" placeholder="Your end date" value={volunteerEndDate} onChange={(e) => setVolunteerEndDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="city">City</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="description" name="description" placeholder="Volunteer City" value={volunteerCompanyCity} onChange={(e) => setVolunteerCompanyCity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="country">Country</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="description" name="description" placeholder="Volunteer Country" value={volunteerCompanyCountry} onChange={(e) => setVolunteerCompanyCountry(e.target.value)}/>
                        </div>
                    </div>
                    <SmartCardHeading handleSubmit={addVolunteers} />

                    {/* HonorsAndAwards */}
                    <h4>Honors And Awards</h4>
                    <div className="row">
                        <div className="col-20">
                            <label for="honor">Honor & Awars</label>
                        </div>
                        <div className="col-75">
                            <textarea type="text" id="honor" name="honor" placeholder="Honor & Award" value={honorsAndAwards.join('\n')}  onChange={(e) => changeHonorAndAwards(e.target.value)}/>
                        </div>
                    </div>

                     {/* Training */}
                    <h4>Training</h4>
                    {/* <SmartCardHeading heading='Training' handleSubmit={addTraining} /> */}
                    {trainings?.map((training, index) => {
                        const {title, institutionName, city, country, startedAt, endedAt, score} = training;
                        return (
                            <span className='sections' key={index}>
                            <RemoveButton heading={`Training ${index+1}`} index={index} />
                                <div className="row">
                                    <div className="col-20">
                                        <label for="institutionTitle">Title</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="institutionTitle" name="title" placeholder="Your Title" value={title} onChange={(e) => trainingChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="institutionName">Institution Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="institutionName" name="institutionName" placeholder="Your Institution Name" value={institutionName} onChange={(e) => trainingChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="city">City</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="city" name="city" placeholder="Training City" value={city} onChange={(e) => trainingChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="country">Country</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="country" name="country" placeholder="Training Country" value={country} onChange={(e) => trainingChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="startDate">Start Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startedAt" placeholder="Your start date" value={startedAt} onChange={(e) => trainingChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="endDate">End Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endedAt" placeholder="Your end date" value={endedAt} onChange={(e) => trainingChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="score">Score</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="score" name="score" placeholder="Score" value={score} onChange={(e) => trainingChangeHandler(e, index)}/>
                                    </div>
                                    <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removeTraining} /> 
                                </div>
                                </div>
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removeTraining} />  */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="institutionTitle">Title</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="institutionTitle" name="institutionTitle" placeholder="Your Title" value={trainingTitle} onChange={(e) => setTrainingTitle(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="institutionName">Institution Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="institutionName" name="institutionName" placeholder="Your Institution Name" value={trainingInstutionName} onChange={(e) => setTrainingInstutionName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="city">City</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="city" name="city" placeholder="Training City" value={trainingCity} onChange={(e) => setTrainingCity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="country">Country</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="country" name="country" placeholder="Training Country" value={trainingCountry} onChange={(e) => setTrainingCountry(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="startDate">Start Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startDate" placeholder="Your start date" value={trainingStartDate} onChange={(e) => setTrainingStartDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="endDate">End Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endDate" placeholder="Your end date" value={trainingEndDate} onChange={(e) => setTrainingEndDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="score">Score</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="score" name="score" placeholder="Score" value={trainingScore} onChange={(e) => setTrainingScore(e.target.value)}/>
                        </div>
                    </div>
                    <SmartCardHeading handleSubmit={addTraining} />

                      {/* Certification */}
                    <h4>Certification</h4>
                    {/* <SmartCardHeading heading='Certification' handleSubmit={addIntership} /> */}
                    {certifications?.map((certification, index )=> {
                        const {title, institutionName, city, country, startedAt, endedAt, score} = certification;
                        return (
                            <span className='sections' key={index}>
                            <RemoveButton heading={`Certification ${index+1}`} index={index} />
                                <div className="row">
                                    <div className="col-20">
                                        <label for="certificationTitle">Title</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="certificationTitle" name="title" placeholder="Your Title" value={title} onChange={(e) => certificationChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="certificationName">Institution Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="certificationName" name="institutionName" placeholder="Institution Name" value={institutionName} onChange={(e) => certificationChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="city">City</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="city" name="city" placeholder="Institution city" value={city} onChange={(e) => certificationChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="country">Country</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="country" name="country" placeholder="Institution country" value={country} onChange={(e) => certificationChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="startDate">Start Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startedAt" placeholder="Your start date" value={startedAt} onChange={(e) => certificationChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="endDate">End Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endedAt" placeholder="Your end date" value={endedAt} onChange={(e) => certificationChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="score">Score</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="score" name="score" placeholder="Score" value={score} onChange={(e) => certificationChangeHandler(e, index)}/>
                                    </div>
                                    <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removeCertification} /> 
                                </div>
                                </div>
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removeCertification} />  */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="certificationTitle">Title</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="certificationTitle" name="certificationTitle" placeholder="Your Title" value={certificationTitle} onChange={(e) => setCertificationTitle(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="certificationName">Institution Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="certificationName" name="certificationName" placeholder="Your Institution Name" value={certificationInstutionName} onChange={(e) => setCertificationInstutionName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="city">City</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="city" name="city" placeholder="Training City" value={certificationCity} onChange={(e) => setCertificationCity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="country">Country</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="country" name="country" placeholder="Training Country" value={certificationCountry} onChange={(e) => setCertificationCountry(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="startDate">Start Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startDate" placeholder="Your start date" value={certificationStartDate} onChange={(e) => setCertificationStartDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="endDate">End Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endDate" placeholder="Your end date" value={certificationEndDate} onChange={(e) => setCertificationEndDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="score">Score</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="score" name="score" placeholder="Score" value={certificationScore} onChange={(e) => setCertificationScore(e.target.value)}/>
                        </div>
                    </div>
                    <SmartCardHeading handleSubmit={addCertification} />

                    
                     {/* License */}
                     <h4>License</h4>
                    {licenses && licenses.map((license, index )=> {
                        const {name, number, issuer, validFrom, validTill} = license;
                        return (
                            <span className='sections' key={index}>
                            <RemoveButton heading={`License ${index+1}`} index={index} />
                                <div className="row">
                                    <div className="col-20">
                                        <span for="certificationTitle">License Name</span>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="certificationTitle" name="title" placeholder="Your Title" value={name} onChange={(e) => licenseHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <span for="certificationName">License Number</span>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="certificationName" name="institutionName" placeholder="Institution Name" value={number} onChange={(e) => licenseHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <span for="city">License Issuer</span>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="city" name="city" placeholder="Institution city" value={issuer} onChange={(e) => licenseHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <span for="country">Valid From</span>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="country" name="country" placeholder="Institution country" value={validFrom} onChange={(e) => licenseHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <span for="startDate">Valid To</span>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max="9999-12-31" id="startDate" name="startedAt" placeholder="Your start date" value={validTill} onChange={(e) => licenseHandleChange(e, index)}/>
                                    </div>
                                    <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removeLicense} /> 
                                </div>
                                </div>
                               
                               
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removeCertification} />  */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="licenseName">License Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="licenseName" name="licenseName" placeholder="License Name" value={licenseName} onChange={(e) =>setLicenseName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="licenseNumber">License Number</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="licenseNumber" name="licenseNumber" placeholder="License Number" value={licenseNumber} onChange={(e) =>setLicenseNumber(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="licenseNumber">License Issuer</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="licenseNumber" name="licenseNumber" placeholder="License Issuer" value={licenseIssuer} onChange={(e) =>setLicenseIssuer(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="licenseValidity">Valid From</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startDate" placeholder="Your start date" value={licenseValidFrom} onChange={(e) => setLicenseValidFrom(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="licenseValidity">Valid To</label>
                        </div>
                        <div className="col-75">
                        <input autoComplete="off" type="date"  max="9999-12-31" id="startDate" name="startDate" placeholder="Your start date" value={licenseValidTo} onChange={(e) => setLicenseValidTo(e.target.value)}/>
                        </div>
                    </div>
                    <SmartCardHeading handleSubmit={addLicense} />



                       {/* Course */}
                    <h4>Course</h4>
                    {/* <SmartCardHeading heading='Course' handleSubmit={addCourse} /> */}
                    {courses?.map((course, index) => {
                        const {title, institutionName, city, country, startedAt, endedAt, score} = course;
                        return (
                            <span className='sections' key={index}>
                            <RemoveButton heading={`Course ${index+1}`} index={index}  />
                                <div className="row">
                                    <div className="col-20">
                                        <label for="certificationTitle">Title</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="certificationTitle" name="title" placeholder="Your Title" value={title} onChange={(e) => courseChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="certificationName">Institution Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="certificationName" name="institutionName" placeholder="Institution Name" value={institutionName} onChange={(e) => courseChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="city">City</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="city" name="city" placeholder="Institution city" value={city} onChange={(e) => courseChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="country">Country</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="country" name="country" placeholder="Institution country" value={country} onChange={(e) => courseChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="startDate">Start Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startedAt" placeholder="Your start date" value={startedAt} onChange={(e) => courseChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="endDate">End Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endedAt" placeholder="Your end date" value={endedAt} onChange={(e) => courseChangeHandler(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="score">Score</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="score" name="score" placeholder="Score" value={score} onChange={(e) => courseChangeHandler(e, index)}/>
                                    </div>
                                    <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removeCourse} /> 
                                </div>
                                </div>
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removeCourse} />  */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="courseTitle">Title</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="courseTitle" name="courseTitle" placeholder="Your Title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="institutionName">Institute Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="institutionName" name="institutionName" placeholder="Your Institution Name" value={courseInstutionName} onChange={(e) => setCourseInstutionName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="city">City</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="city" name="city" placeholder="Course City" value={courseCity} onChange={(e) => setCourseCity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="country">Country</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="country" name="country" placeholder="Course Country  " value={courseCountry} onChange={(e) => setCourseCountry(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="startDate">Start Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startDate" placeholder="Your start date" value={courseStartDate} onChange={(e) => setCourseStartDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="endDate">End Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endDate" placeholder="Your end date" value={courseEndDate} onChange={(e) => setCourseEndDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="score">Score</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="score" name="score" placeholder="Score" value={courseScore} onChange={(e) => setCourseScore(e.target.value)}/>
                        </div>
                    </div>
                    <SmartCardHeading handleSubmit={addCourse} />

                      {/* Patent */}
                    <h4>Patent</h4>
                    {/* <SmartCardHeading heading='Patent' handleSubmit={addPatent} /> */}
                    {patents?.map((patent, index) => {
                        const {title, number, status, descriptions} = patent;
                        return (
                            <span className='sections' key={index}>
                            <RemoveButton heading={`Patent ${index+1}`} index={index} />
                                <div className="row">
                                    <div className="col-20">
                                        <label for="certificationTitle">Title</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="certificationTitle" name="title" placeholder="Patent Title" value={title} onChange={(e) => patentHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="number">Institution Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="certificationName" name="number" placeholder="Patent Number" value={number} onChange={(e) => patentHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="patentStatus">Patent Status</label>
                                    </div>
                                    <div className="col-75">
                                        <select id="patentStatus" name="status" onChange={e => patentHandleChange(e, index)}>
                                            <option value={status} placeholder='please select the option'>{status}</option>
                                            {status != "Applied" && <option value="Apllied">Applied</option>}
                                            {status != "Approved" && <option value="Approved">Approved</option>}
                                        </select>
                                    </div>
                                    <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removePatent} /> 
                                </div>
                                    </div>
                                    {/* <RemoveButton content="Remove" index={index} handleSubmit={removePatent} />  */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="patentTitle">Patent Title</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="patentTitle" name="patentTitle" placeholder="Your Patent Title" value={patentTitle} onChange={(e) =>setPatentTitle(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="patentNumber">Patent Number</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="patentNumber" name="patentNumber" placeholder="Your Patent Number" value={patentNumber} onChange={(e) =>setPatentNumber(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="patentStatus">Patent Status</label>
                        </div>
                        <div className="col-75">
                            <select id="patentStatus" name="patentStatus" onChange={e => setPatentStatus(e.target.value)}>
                                <option value="" placeholder='please select the option'></option>
                                <option value="apllied">Applied</option>
                                <option value="approved">Approved</option>
                            </select>
                        </div>
                    </div>
                    <SmartCardHeading handleSubmit={addPatent} />

                      {/* Publication */}
                    <h4>Publication</h4>
                    {/* <SmartCardHeading heading='Publication' handleSubmit={addPublication} /> */}
                    {publications?.map((publication, index) => {
                        const {title, date, descriptions} = publication;
                        return (
                            <span className='sections' key={index}>
                            <RemoveButton heading={`Publication ${index+1}`} index={index} />
                                <div className="row">
                                    <div className="col-20">
                                        <label for="certificationTitle">Title</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="certificationTitle" name="title" placeholder="Publication Title" value={title} onChange={(e) => publicationHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="number">Institution Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="certificationName" name="date" placeholder="publication Date" value={date} onChange={(e) => publicationHandleChange(e, index)}/>
                                    </div>
                                    <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removePublication} /> 
                                </div>
                                </div>
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removePublication} />  */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="publicationName">Title</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="publicationName" name="publicationName" placeholder="Publication Name" value={publicationName} onChange={(e) =>setPublicationName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="publicationDate">Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="publicationDate" name="publicationDate" placeholder="Publication Date" value={publicationDate} onChange={(e) =>setPublictionDate(e.target.value)}/>
                        </div>
                    </div>
                    <SmartCardHeading handleSubmit={addPublication} />

                    {/* <div className="row">
                        <div className="col-20" >
                            <i className="fa fa-plus" aria-hidden="true" style={{fontSize: "2rem", color: 'var(--secondary-color)'}} onClick={(e) => addPublication(e)}></i>
                        </div>
                    </div> */}

                    {/* Workshop */}
                    <h4>Workshop</h4>
                    {/* <SmartCardHeading heading='Workshop' handleSubmit={addWorkshops} /> */}
                    {workshops?.map((workshop, index) => {
                        return (
                            <span className='sections' key={index}>
                            <RemoveButton heading={`Workshop ${index+1}`} index={index}/>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="projectNumber">Designation</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="projectNumber" name="designation" placeholder="Your Designation" value={workshop.designation} onChange={(e) => workshopHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="projectTitle">Company Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="projectTitle" name="companyName" placeholder="Your Company Name" value={workshop.companyName} onChange={(e) => workshopHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="startDate">Start Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startedAt" placeholder="Your start date" value={workshop.startedAt} onChange={(e) => workshopHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="endDate">End Date</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endedAt" placeholder="Your end date" value={workshop.endedAt} onChange={(e) => workshopHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="city">City</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="description" name="city" placeholder="Workshop City" value={workshop.city} onChange={(e) => workshopHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="country">Country</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="description" name="country" placeholder="Workshop Country" value={workshop.country} onChange={(e) => workshopHandleChange(e, index)}/>
                                    </div>
                                    <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removeWorkshops} />
                                </div>
                                </div>
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removeWorkshops} />  */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="projectNumber">Designation</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="projectNumber" name="projectNumber" placeholder="Your Designation" value={workshopDesignation} onChange={(e) => setWorkshopDesignation(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="projectTitle">Company Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="projectTitle" name="projectTitle" placeholder="Your Company Name" value={workshopCompanyName} onChange={(e) => setWorkshopCompanyName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="startDate">Start Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="startDate" name="startDate" placeholder="Your start date" value={workshopStartDate} onChange={(e) => setWorkshopStartDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="endDate">End Date</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max="9999-12-31" id="endDate" name="endDate" placeholder="Your end date" value={workshopEndDate} onChange={(e) => setWorkshopEndDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="city">City</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="description" name="description" placeholder="Workshop City" value={workshopCompanyCity} onChange={(e) => setWorkshopCompanyCity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="country">Country</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="description" name="description" placeholder="Workshop Country" value={workshopCompanyCountry} onChange={(e) => setWorkshopCompanyCountry(e.target.value)}/>
                        </div>
                    </div>

                    <SmartCardHeading handleSubmit={addWorkshops} />

                    
                    {/* Reference */}
                    <h4>Reference</h4>
                    {/* <SmartCardHeading heading='Reference' handleSubmit={addReference} /> */}
                    {references?.map((reference, index) => {
                        const {name, designation, company, email} = reference;
                        return (
                            <span className='sections' key={index}>
                            <RemoveButton heading={`Reference ${index+1}`} index={index} />
                                <div className="row">
                                    <div className="col-20">
                                        <label for="certificationTitle">Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="certificationTitle" name="name" placeholder="Reference Name" value={name} onChange={(e) => referenceHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="certificationName">Designation</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="certificationName" name="designations" placeholder="Designation Name" value={designation} onChange={(e) => referenceHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="city">City</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="city" name="company" placeholder="Company Name" value={company} onChange={(e) => referenceHandleChange(e, index)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-20">
                                        <label for="country">Country</label>
                                    </div>
                                    <div className="col-75">
                                        <input autoComplete="off" type="text" id="country" name="email" placeholder="Email" value={email} onChange={(e) => referenceHandleChange(e, index)}/>
                                    </div>
                                    <div className='col-75 remove_button'>
                            <RemoveButton content="Remove" index={index} handleSubmit={removeReference} /> 
                                </div>
                                </div>
                                {/* <RemoveButton content="Remove" index={index} handleSubmit={removeReference} />  */}
                            </span>
                        )
                    })}
                    <div className="row">
                        <div className="col-20">
                            <label for="referenceName">Name</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="referenceName" name="referenceName" placeholder="Your Reference Name" value={referenceName} onChange={(e) => setReferenceName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="referenceDesignation">Designation</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="referenceDesignation" name="referenceDesignation" placeholder="Designation" value={referenceDesignation} onChange={(e) => setReferenceDesignation(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="referenceCompany">Company</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="referenceCompany" name="referenceCompany" placeholder="Company" value={referenceCompany} onChange={(e) => setReferenceCompany(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="referenceEmail">Email</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="referenceEmail" name="referenceEmail" placeholder="Email" value={referenceEmail} onChange={(e) => setReferenceEmail(e.target.value)}/>
                        </div>
                    </div>
                    <SmartCardHeading handleSubmit={addReference} />

                    {/* <div className="row">
                        <div className="col-20" >
                            <i className="fa fa-plus" aria-hidden="true" style={{fontSize: "2rem", color: 'var(--secondary-color)'}} onClick={(e) => addReference(e)}></i>
                        </div>
                    </div> */}

                    {/* Personal Details */}
                    <h4>Personal Details</h4>
                    <div className="row">
                        <div className="col-20">
                            <label for="languageKnown">Languages Known</label>
                        </div>
                        <div className="col-75">
                            <textarea type="text" id="languageKnown" name="languageKnown" placeholder="Known Languages" value={languageKnown.join('\n')} onChange={(e) => changeknownLanguages(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="dateOfBirth">Date Of Birth</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="date"  max={new Date().toISOString().split("T")[0]} id="dateOfBirth" name="dateOfBirth" placeholder="Date Of Birth" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="nationality">Nationality</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="nationality" name="nationality" placeholder="Nationality" value={nationality} onChange={e => setNationality(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="passport">Passport</label>
                        </div>
                        <div className="col-75">
                            <input autoComplete="off" type="text" id="passport" name="passport" placeholder="Passport" value={passport} onChange={(e) =>setPassport(e.target.value)}/>
                        </div>
                    </div>


                    <div className="row">
                        <button className='submit'>Submit</button>
                    </div>
                </form>
}
        </div>

     );
}
 
export default SmartCardEdit;