"use client";

import {
  Download,
  Github,
  Linkedin,
  Plus,
  Trash2,
  Twitter,
  Upload,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AvatarUpload } from "~/components/avatar-upload";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import InlineEdit from "./inline-edit";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CVData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  twitter: string;
  github: string;
  relevantExperience: string;
  totalExperience: string;
  summary: string;
  image: string;
  careerObjective: string;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string[];
  }>;
  keyProjects: string[];
  certificates: string[];
  technicalExpertise: Record<string, number>;
  skills: string[];
  methodologies: string[];
  tools: string[];
  education: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
}

type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  border: string;
};

const themes: Record<string, ThemeColors> = {
  default: {
    primary: "bg-gray-200 text-gray-800",
    secondary: "bg-gray-100 text-gray-700",
    accent: "bg-gray-300",
    text: "text-gray-800",
    border: "border-gray-300",
  },
  grayscale: {
    primary: "bg-gray-700 text-white",
    secondary: "bg-gray-200 text-gray-800",
    accent: "bg-gray-500",
    text: "text-gray-900",
    border: "border-gray-400",
  },
};

type ThemeName = "default" | "grayscale";

export function CvBuilderWithTheming() {
  const [cvData, setCVData] = useState<CVData>({
    name: "Bao Nguyen",
    title: "Frontend Engineer",
    email: "thebao.dev@gmail.com",
    phone: "+84 905762264",
    location: "Viet Nam",
    linkedin: "linkedin.com/in/baonguyen",
    twitter: "twitter.com/baonguyen",
    github: "github.com/baonguyen",
    relevantExperience: "6 years",
    totalExperience: "7 Years",
    summary:
      "I am a frontend engineer with 6 years of experiences working in web development, especially website builders, SaaS products.",
    image: "https://placehold.co/400x400",
    careerObjective:
      "I focus on modern frontend stack, including modern JS, React, Redux, UI/UX principles, accessibility, and design systems.",
    experience: [
      {
        company: "Flodesk",
        position: "Senior Frontend Engineer",
        period: "Jan 2024 - present",
        description: [
          "Build and design the foundation for Flodesk's builders on mobile web.",
          "Working to collaborate, adopt & improvements for Flodesk's design system.",
          "Leading the design system adoption team. ( adopt a new design system to legacy UI)",
          "Mentoring & guide new members about platform's UX, convention and design system.",
        ],
      },
      {
        company: "Frontend Engineer",
        position: "Frontend Engineer",
        period: "Nov 2019 - Jan 2024",
        description: [
          "Developed key features for Flodesk's web app and website builders.",
          "Built internal UI libraries with a focus on user experience (UX).",
          "Established foundational principles for usability and accessibility.",
          "Collaborated closely with the design team & stakeholders to streamline the design-to-development workflow.",
        ],
      },
      {
        company: "Sun*",
        position: "Frontend Developer",
        period: "Jan 2019 - Oct 2019",
        description: [
          "Build high quality interfaces, websites for e-commerce, business, landing pages using modern web tech: React, Redux, CSS in JS, etc.",
          "Setup project's bundlers, boilerplates, and best practices for web development.",
        ],
      },
      {
        company: "Green System Solutions",
        position: "iOS Developer Intern",
        period: "Dec 2016 - Aug 2017",
        description: [
          "Led the development and maintenance of iOS application for the inVietNam project, a comprehensive travel guide for Vietnam.",
        ],
      },
    ],
    keyProjects: [
      "Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software.",
      "Isolated previously undiscovered flaw in price checking tool resulting in more competitive pricing and a 20 percent increase in revenue.",
      "Implemented automated testing tools spawning more diligent levels of regression testing, negative testing, error/bug retests and usability.",
      "Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software.",
    ],
    certificates: [
      "React and redux - A complete guide 2020 from Udemy",
      "Agile and Scrum Master Certificate from Udacity",
      "Best performer award for consistently exceeding the performance",
      "Certificate of exceptional bug finder by XYZ client",
      "Recognition zero defect delivery",
      "Best performer award for consistently exceeding the performance",
    ],
    technicalExpertise: {
      JavaScript: 90,
      HTML5: 85,
      CSS: 80,
      React: 95,
      NextJs: 75,
    },
    skills: [
      "Algorithms",
      "Progressive Web Apps",
      "SQL",
      "Data Structures",
      "jQuery",
      "Redux",
      "Firebase",
    ],
    methodologies: [
      "Component based architecture",
      "Agile methodology",
      "Design Patterns",
      "Test Driven Development",
      "MVC",
    ],
    tools: ["Git", "VS Code", "Webpack"],
    education: [
      {
        degree: "MS - Cloud technology",
        institution: "MIT, University",
        period: "Jan 2014 -Jan 2016",
      },
      {
        degree: "B.Tech (VTU) - Computer Science",
        institution: "NMAMIT, Nitte",
        period: "Jan 2010 -Jan 2014",
      },
    ],
  });

  const [currentTheme, setCurrentTheme] = useState<ThemeName>("default");
  const [isLoaded, setIsLoaded] = useState(false);

  const currentThemeData = useMemo(() => {
    return themes[currentTheme] ?? themes.default;
  }, [currentTheme]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCVData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string | string[],
  ) => {
    setCVData((prevData) => ({
      ...prevData,
      experience: prevData.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const handleEducationChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    setCVData((prevData) => ({
      ...prevData,
      education: prevData.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu,
      ),
    }));
  };

  const addExperience = () => {
    setCVData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        { company: "", position: "", period: "", description: [] },
      ],
    }));
  };

  const addEducation = () => {
    setCVData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        { degree: "", institution: "", period: "" },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setCVData((prevData) => ({
      ...prevData,
      experience: prevData.experience.filter((_, i) => i !== index),
    }));
  };

  const removeEducation = (index: number) => {
    setCVData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    // Apply theme to body
    if (currentThemeData?.secondary) {
      document.body.className = currentThemeData.secondary;
    }
    setIsLoaded(true);
  }, [currentTheme, currentThemeData?.secondary]);

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <div
      className={`container mx-auto min-h-screen p-4 ${currentThemeData?.secondary}`}
    >
      <div className="mb-6 flex items-center justify-between">
        <h1 className={`text-3xl font-bold ${currentThemeData?.text}`}>
          Professional CV Builder
        </h1>
        <div className="flex gap-2">
          <Select
            onValueChange={(value: ThemeName) => setCurrentTheme(value)}
            defaultValue={currentTheme}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Theme</SelectItem>
              <SelectItem value="grayscale">Grayscale Theme</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <AvatarUpload
                      onImageChange={(image) =>
                        setCVData((prevData) => ({
                          ...prevData,
                          image,
                        }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={cvData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={cvData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={cvData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={cvData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={cvData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={cvData.linkedin}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={cvData.twitter}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        name="github"
                        value={cvData.github}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="relevantExperience">
                        Relevant Experience
                      </Label>
                      <Input
                        id="relevantExperience"
                        name="relevantExperience"
                        value={cvData.relevantExperience}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalExperience">Total Experience</Label>
                      <Input
                        id="totalExperience"
                        name="totalExperience"
                        value={cvData.totalExperience}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      value={cvData.summary}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="careerObjective">Career Objective</Label>
                    <Textarea
                      id="careerObjective"
                      name="careerObjective"
                      value={cvData.careerObjective}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cvData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="space-y-2 border-b pb-4 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">
                          Experience {index + 1}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`exp-company-${index}`}>
                            Company
                          </Label>
                          <Input
                            id={`exp-company-${index}`}
                            value={exp.company}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "company",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`exp-position-${index}`}>
                            Position
                          </Label>
                          <Input
                            id={`exp-position-${index}`}
                            value={exp.position}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "position",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor={`exp-period-${index}`}>Period</Label>
                        <Input
                          id={`exp-period-${index}`}
                          value={exp.period}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "period",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`exp-description-${index}`}>
                          Description (one per line)
                        </Label>
                        <Textarea
                          id={`exp-description-${index}`}
                          value={exp.description.join("\n")}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "description",
                              e.target.value.split("\n"),
                            )
                          }
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={addExperience}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Experience
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Key Projects / Involvements</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="keyProjects">
                    Key Projects (one per line)
                  </Label>
                  <Textarea
                    id="keyProjects"
                    name="keyProjects"
                    value={cvData.keyProjects.join("\n")}
                    onChange={(e) =>
                      setCVData((prevData) => ({
                        ...prevData,
                        keyProjects: e.target.value.split("\n"),
                      }))
                    }
                    rows={6}
                  />
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Certificates and Awards</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="certificates">
                    Certificates (one per line)
                  </Label>
                  <Textarea
                    id="certificates"
                    name="certificates"
                    value={cvData.certificates.join("\n")}
                    onChange={(e) =>
                      setCVData((prevData) => ({
                        ...prevData,
                        certificates: e.target.value.split("\n"),
                      }))
                    }
                    rows={6}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Expertise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(cvData.technicalExpertise).map(
                    ([skill, level]) => (
                      <div key={skill}>
                        <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                        <Slider
                          id={`skill-${skill}`}
                          min={0}
                          max={100}
                          step={1}
                          value={[level]}
                          onValueChange={(value) =>
                            setCVData((prevData) => ({
                              ...prevData,
                              technicalExpertise: {
                                ...prevData.technicalExpertise,
                                [skill]: value[0]!,
                              },
                            }))
                          }
                        />
                      </div>
                    ),
                  )}
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Skills / Exposure</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={cvData.skills.join(", ")}
                    onChange={(e) =>
                      setCVData((prevData) => ({
                        ...prevData,
                        skills: e.target.value
                          .split(",")
                          .map((skill) => skill.trim()),
                      }))
                    }
                  />
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Methodology / Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="methodologies">
                    Methodologies (comma-separated)
                  </Label>
                  <Input
                    id="methodologies"
                    name="methodologies"
                    value={cvData.methodologies.join(", ")}
                    onChange={(e) =>
                      setCVData((prevData) => ({
                        ...prevData,
                        methodologies: e.target.value
                          .split(",")
                          .map((method) => method.trim()),
                      }))
                    }
                  />
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="tools">Tools (comma-separated)</Label>
                  <Input
                    id="tools"
                    name="tools"
                    value={cvData.tools.join(", ")}
                    onChange={(e) =>
                      setCVData((prevData) => ({
                        ...prevData,
                        tools: e.target.value
                          .split(",")
                          .map((tool) => tool.trim()),
                      }))
                    }
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cvData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="space-y-2 border-b pb-4 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Education {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                        <Input
                          id={`edu-degree-${index}`}
                          value={edu.degree}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "degree",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`edu-institution-${index}`}>
                          Institution
                        </Label>
                        <Input
                          id={`edu-institution-${index}`}
                          value={edu.institution}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "institution",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`edu-period-${index}`}>Period</Label>
                        <Input
                          id={`edu-period-${index}`}
                          value={edu.period}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "period",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={addEducation}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Education
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div
          className={`${currentThemeData?.primary} max-h-[calc(100vh-2rem)] overflow-y-auto rounded-lg p-8 shadow-lg`}
        >
          <div className={`mb-6 pb-6 ${currentThemeData?.border}`}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="mb-2 text-4xl font-bold">
                  <InlineEdit
                    value={cvData.name}
                    onChange={(value) =>
                      setCVData((prev) => ({ ...prev, name: value }))
                    }
                  />
                </h2>
                <h3 className="mb-4 text-xl">
                  <InlineEdit
                    value={cvData.title}
                    onChange={(value) =>
                      setCVData((prev) => ({ ...prev, title: value }))
                    }
                  />
                </h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <InlineEdit
                    value={cvData.email}
                    onChange={(value) =>
                      setCVData((prev) => ({ ...prev, email: value }))
                    }
                  />
                  <InlineEdit
                    value={cvData.phone}
                    onChange={(value) =>
                      setCVData((prev) => ({ ...prev, phone: value }))
                    }
                  />
                  <InlineEdit
                    value={cvData.location}
                    onChange={(value) =>
                      setCVData((prev) => ({ ...prev, location: value }))
                    }
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  <a
                    href={cvData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={cvData.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={cvData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="text-right">
                {cvData.image && (
                  <div className="flex-center flex w-full max-w-40 p-4">
                    <Avatar className="h-full w-full">
                      <AvatarImage
                        src={cvData.image}
                        alt="Avatar"
                        className="object-cover"
                      />
                      <AvatarFallback className="h-full w-full">
                        Avatar
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}
                <p>
                  Relevant experience:{" "}
                  <InlineEdit
                    value={cvData.relevantExperience}
                    onChange={(value) =>
                      setCVData((prev) => ({
                        ...prev,
                        relevantExperience: value,
                      }))
                    }
                  />
                </p>
                <p>
                  Total experience:{" "}
                  <InlineEdit
                    value={cvData.totalExperience}
                    onChange={(value) =>
                      setCVData((prev) => ({ ...prev, totalExperience: value }))
                    }
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div>
                <h4 className="mb-2 text-lg font-semibold">Work Experience</h4>
                {cvData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h5 className="font-semibold">{exp.position}</h5>
                    <p>
                      {exp.company} | {exp.period}
                    </p>
                    <ul className="mt-2 list-inside list-disc">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Key Projects / Involvements
                </h4>
                <ul className="list-inside list-disc">
                  {cvData.keyProjects.map((project, index) => (
                    <li key={index}>{project}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Certificates and Awards
                </h4>
                <ul className="list-inside list-disc">
                  {cvData.certificates.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="mb-2 text-lg font-semibold">Summary</h4>
                <p>{cvData.summary}</p>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">Career Objective</h4>
                <p>{cvData.careerObjective}</p>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Technical Expertise
                </h4>
                {Object.entries(cvData.technicalExpertise).map(
                  ([skill, level]) => (
                    <div key={skill} className="mb-2">
                      <div className="flex justify-between text-sm">
                        <span>{skill}</span>
                        <span>{level}%</span>
                      </div>
                      <div
                        className={`w-full ${currentThemeData?.secondary} h-2.5 rounded-full`}
                      >
                        <div
                          className={`${currentThemeData?.accent} h-2.5 rounded-full`}
                          style={{ width: `${level}%` }}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Skills / Exposure
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`${currentThemeData?.secondary} rounded px-2 py-1 text-sm`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Methodology / Approach
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cvData.methodologies.map((method, index) => (
                    <span
                      key={index}
                      className={`${currentThemeData?.secondary} rounded px-2 py-1 text-sm`}
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {cvData.tools.map((tool, index) => (
                    <span
                      key={index}
                      className={`${currentThemeData?.secondary} rounded px-2 py-1 text-sm`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">Education</h4>
                {cvData.education.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-semibold">{edu.degree}</p>
                    <p>
                      {edu.institution}, {edu.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
