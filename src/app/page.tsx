"use client";
import React, { ChangeEvent, useState } from 'react';
import styles from './page.module.css';
import { IoCloseOutline } from "react-icons/io5";

interface FormData {
  jobDescription: string;
  fullName: string;
  aboutMe: string;
  skills: string[];
  workExperience: string[];
  education: string[];
  certifications: string[];
}


const page = () => {
  // {
  //   jobDescription: "",
  //   fullName: "",
  //   aboutMe: "",
  //   skills: [],
  //   workExperience: [],
  //   education: [],
  //   certifications: []
  // }
  const [formData, setFormData] = useState<FormData>(
    {
      jobDescription: "Looking for a skilled frontend developer to join our dynamic team.",
      fullName: "John Doe",
      aboutMe: "Passionate developer with over 5 years of experience in web development.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      workExperience: ["Frontend Developer at ABC Corp", "Web Developer at XYZ Ltd"],
      education: ["B.Sc. in Computer Science", "M.Sc. in Software Engineering"],
      certifications: ["Certified ScrumMaster", "AWS Certified Solutions Architect"]
    }
  )


  // {
  //   jobDescription: "Looking for a skilled frontend developer to join our dynamic team.", 
  //   fullName: "John Doe", 
  //   aboutMe: "Passionate developer with over 5 years of experience in web development.", 
  //   skills: ["HTML", "CSS", "JavaScript", "React"],
  //    workExperience: ["Frontend Developer at ABC Corp", "Web Developer at XYZ Ltd"],
  //     education: ["B.Sc. in Computer Science", "M.Sc. in Software Engineering"],
  //      certifications: ["Certified ScrumMaster", "AWS Certified Solutions Architect"]
  // }

  const [newSkill, setNewSkill] = useState<string>("");
  const [newWorkExperience, setNewWorkExperience] = useState<string>("");
  const [newEducation, setNewEducation] = useState<string>("");
  const [newCertification, setNewCertification] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill]
      })
      setNewSkill("");

    }
  }
  const handleRemoveSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    })
  }
  const handleAddWorkExperience = () => {
    if (newWorkExperience.trim() !== "") {
      setFormData({
        ...formData,
        workExperience: [...formData.workExperience, newWorkExperience]
      });
      setNewWorkExperience("");
    }
  };
  const handleRemoveWorkExperience = (index: number) => {
    setFormData({
      ...formData,
      workExperience: formData.workExperience.filter((_, i) => i !== index)
    });
  };
  const handleAddEducation = () => {
    if (newEducation.trim() !== "") {
      setFormData({
        ...formData,
        education: [...formData.education, newEducation]
      });
      setNewEducation("");
    }
  };
  const handleRemoveEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index)
    });
  };
  const handleAddCertification = () => {
    if (newCertification.trim() !== "") {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, newCertification]
      });
      setNewCertification("");
    }
  };
  const handleRemoveCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index)
    });
  };



  const [ATSscore, setATSscore] = useState<string>("");
  const getAtsScore = async () => {
    let GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API


    //     Suppose ATS score in percentage is X% for someone with the following qualifications:

    //  {
    //    jobDescription: "Looking for a moovie actor",
    //    fullName: "John Doe",
    //    aboutMe: "Passionate developer with over 5 years of experience in web development.",
    //    skills: ["HTML", "CSS", "JavaScript", "React"],
    //    workExperience: ["Frontend Developer at ABC Corp", "Web Developer at XYZ Ltd"],
    //    education: ["B.Sc. in Computer Science", "M.Sc. in Software Engineering"],
    //    certifications: ["Certified ScrumMaster", "AWS Certified Solutions Architect"]
    //   }

    //  So, if I ask "What is the estimated ATS score based on this information?", then just give the exact value of X, nothing else.


    // What is the estimated ATS score based on this information ?

    const tempPrompt = `
    Suppose ATS score in percentage is X% for someone with the following qualifications:
    
${formData}

 So, if I ask "What is the estimated ATS score based on this information?", then just give the exact value of X, nothing else.
`

    const conversation = [
      {
        parts: [{ text: tempPrompt }],
        role: "user",
      },
      {
        parts: [{ text: "Okay, I understand." }],
        role: "model",
      },
      {
        parts: [{ text: "What is the estimated ATS score based on this information?" }],
        role: "user",
      },
    ]

    let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=` + GOOGLE_API_KEY
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "contents": conversation
      })
    })

    let resjson = await res.json()
    // console.log(resjson)
    const score = resjson.candidates[0].content.parts[0].text;
    console.log(score)

    setATSscore(score)
  }


  return (
    <div className={styles.page}>
      {ATSscore.length > 0 ?
        <div className={styles.result}>
          <p>Your Score is</p>
          <h1>{ATSscore}</h1>
          <button
            onClick={() => setATSscore("")}
          >Check Again</button>
        </div>
        :
        <div className={styles.main}>
          <h1 className={styles.header}>Check ATS Score</h1>
          <label className={styles.label}>Job Description</label>
          <textarea
            className={styles.textarea}
            name="jobDescription"
            placeholder='Enter Job Description'
            value={formData.jobDescription}
            onChange={handleChange}
          />
          <label className={styles.label}>Full Name</label>
          <input
            className={styles.input}
            name="fullName"
            placeholder='Enter Full Name'
            value={formData.fullName}
            onChange={handleChange}
          />
          <label className={styles.label}>About me</label>
          <textarea
            className={styles.textarea}
            name="aboutMe"
            placeholder='About me'
            value={formData.aboutMe}
            onChange={handleChange}
          />



          <label className={styles.label}>Skills</label>
          <div className={styles.list1}>
            {formData.skills.map((item, index) => (
              <p key={index} className={styles.list1Item}>{item}
                <IoCloseOutline onClick={() => handleRemoveSkill(index)} />
              </p>
            ))}
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder='New Skill'
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button
              className={styles.button} onClick={handleAddSkill}
            >Add</button>
          </div>


          <label className={styles.label}>Work Experience</label>
          <div className={styles.list2}>
            {formData.workExperience.map((item, index) => (
              <p key={index} className={styles.list2Item}>
                {item}
                <IoCloseOutline onClick={() => handleRemoveWorkExperience(index)} />
              </p>
            ))}
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder='New Work Experience'
              value={newWorkExperience}
              onChange={(e) => setNewWorkExperience(e.target.value)}
            />
            <button className={styles.button} onClick={handleAddWorkExperience}>Add</button>
          </div>

          <label className={styles.label}>Education</label>
          <div className={styles.list2}>
            {formData.education.map((item, index) => (
              <p key={index} className={styles.list2Item}>
                {item}
                <IoCloseOutline onClick={() => handleRemoveEducation(index)} />
              </p>
            ))}
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder='New Education'
              value={newEducation}
              onChange={(e) => setNewEducation(e.target.value)}
            />
            <button className={styles.button} onClick={handleAddEducation}>Add</button>
          </div>


          <label className={styles.label}>Certifications</label>
          <div className={styles.list2}>
            {formData.certifications.map((item, index) => (
              <p key={index} className={styles.list2Item}>
                {item}
                <IoCloseOutline onClick={() => handleRemoveCertification(index)} />
              </p>
            ))}
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder='New Certification'
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
            />
            <button className={styles.button} onClick={handleAddCertification}>Add</button>
          </div>
          <button
            className={styles.button}
            onClick={() => getAtsScore()}
          >Scan</button>
        </div>
      }
    </div>
  )
}

export default page