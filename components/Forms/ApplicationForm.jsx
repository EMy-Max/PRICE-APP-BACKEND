"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormSections from "@/components/shared/FormSections";
import { applicationSchema } from "@/utils/schema";
import { useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";
import { useApplication } from "@/hooks";
import FormSuccess from "../shared/Forms/form-success";
import FormError from "../shared/Forms/form-error";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { cn } from "@/lib/utils";
import { CldUploadButton } from "next-cloudinary";

export default function ApplicationForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const { data: session } = useSession();
  const { mutateAsync, data: newApp, isSuccess, isError } = useApplication();

  const form = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      surname: session?.user.surname,
      firstName: session?.user.firstName,
      otherNames: "",
      sex: "",
      maritalStatus: "",
      email: session?.user.email,
      dob: "",
      country: "",
      stateOfOrigin: "",
      stateOfResidence: "",
      city: "", ///////////////////////
      phone: "",
      whatsappPhone: "", ////////////////////////////
      PHCode: "",
      institutionAttended: "",
      course: "",
      project: "",
      highestQualification: "", ////////////////////////
      certificate: "", //////////////
      nationalServiceCert: "", ////////////////
      skills: "",
      occupation: "",
      durationOfOccupation: "",
      denomination: "",
      pastorName: "",
      pastorPhone: "",
      bornAgain: "",
      when: "",
      how: "",
      discipleshipRelationship: "",
      disciplerName: "",
      disciplerPhone: "",
      disciplerAddress: "",
      accept: false,
    },
  });

  const { watch, reset, formState, setValue } = form;

  const { isLoading, isSubmitSuccessful, isSubmitting } = formState;

  const bornAgain = watch("bornAgain");
  const accept = watch("accept");
  const discipleshipRelationship = watch("discipleshipRelationship");

  async function onSubmit(data) {
    setError("");
    setSuccess("");
    
    try {
      await mutateAsync(data);
      setSuccess("Application successful!");

      return router.push(`/admissions/monitor`);
    } catch (error) {
      // console.log("HERE CHECK", error?.response?.data.ongoing);
      if (error) {
        switch (error?.response.data.ongoing) {
          case true:
            return router.push(`/admissions/monitor`);
            break;
          default:
            error?.response.data.error;
            return setError(error?.response.data.error);
            break;
        }
      }
    }
  }
  // Handling  Certificate Upload
  async function handleCertUpload(result) {
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url;
      const public_id = info.public_id;

      setValue("certificate", url);
    }
  }
  // Handling National Certificate Upload
  async function handleNationalCertUpload(result) {
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url;
      const public_id = info.public_id;

      setValue("nationalServiceCert", url);
    }
  }

  return (
    <div className="flex flex-col gap-y-6 py-6 px-4 justify-center items-center ">
      <h3 className="text-xl md:text-2xl font-bold text-blue-900">
        Ensure to Fill All Fields Carefully
      </h3>
      <Alert
        className={cn(
          "flex items-center gap-4 py-2 px-4 w-full md:w-4/6 mx-auto "
        )}
      >
        <span className="text-2xl">⚠️</span>
        <div className="">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            {`Welcome, ${
              session?.user.firstName + " " + session?.user.surname
            }`}
            <br />
            <span className="text-yellow-600">
              Kindly supply PDF or Image of certificates.Ensure the image type
              is jpg,jpeg or png.
            </span>
          </AlertDescription>
        </div>
      </Alert>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full flex flex-col gap-10 justify-center items-center flex-wrap"
        >
          {/* PERSONAL INFORMATION */}
          <FormSections title=" Personal Information">
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname *</FormLabel>
                  <FormControl>
                    <Input placeholder="Surname" {...field} className="w-72 " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherNames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Names</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Other Names"
                      {...field}
                      className="w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sex *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-72 ">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-72 ">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Engaged">Engaged</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Of Birth *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className=" w-72" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSections>

          {/* CONTACT INFORMATION */}
          <FormSections title=" Contact Information">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address*</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} className="w-72 font-bold text-brand2" disabled/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone*</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} className="w-72 " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsappPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Whatsapp Contact*</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} className="w-72 " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PHCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PHCode</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter PHCode"
                      {...field}
                      className="w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country*</FormLabel>
                  <FormControl>
                    <Input placeholder="country" {...field} className="w-72 " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stateOfOrigin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State Of Origin</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="State of origin"
                      {...field}
                      className=" w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stateOfResidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State Of Residence</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="State of residence"
                      {...field}
                      className="w-72"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City/Town *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name of City or Town"
                      {...field}
                      className="w-72"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSections>

          {/* EDUCATIONAL BACKGROUND */}
          <FormSections title="Educational Background">
            <FormField
              control={form.control}
              name="institutionAttended"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Attended *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Institution Attended"
                      {...field}
                      className="w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Of Study*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Course of study"
                      {...field}
                      className=" w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title of Project Work Done</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Project work done"
                      {...field}
                      className="w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="highestQualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highest Qualification *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-72 ">
                        <SelectValue placeholder="Highest Qualification" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Phd">Phd</SelectItem>
                      <SelectItem value="MSc">MSc</SelectItem>
                      <SelectItem value="BSc">{`Bachelor's Degree`}</SelectItem>
                      <SelectItem value="HND">HND</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certificate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Certificate *</FormLabel>

                  <CldUploadButton
                    uploadPreset="rnj0cok5"
                    options={{ sources: ["local"] }}
                    onSuccess={handleCertUpload}
                    className="w-72"
                  >
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="w-full "
                        placeholder="Click To Add Certificate"
                      />
                    </FormControl>
                  </CldUploadButton>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationalServiceCert"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>National Service Certificate(NYSC) </FormLabel>

                  <CldUploadButton
                    uploadPreset="nbek5r3w"
                    options={{ sources: ["local"] }}
                    onSuccess={handleNationalCertUpload}
                    className="w-72 "
                  >
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="w-full "
                        placeholder="Click To Add National Service Certificate"
                      />
                    </FormControl>
                  </CldUploadButton>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extra Curricular Activities/Skills </FormLabel>
                  <FormControl>
                    <Input
                      placeholder=" List Extra Curricular Activities "
                      {...field}
                      className="w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=" Occupation "
                      {...field}
                      className="w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="durationOfOccupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration of Occupation </FormLabel>
                  <FormControl>
                    <Input
                      placeholder=" Duration of Occupation  "
                      {...field}
                      className="w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSections>

          {/* CHRISTIAN BACKGROUND */}
          <FormSections title="Christian Background">
            <FormField
              control={form.control}
              name="denomination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Church/Denomination *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="denomination"
                      {...field}
                      className="w-72"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pastorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Pastor/Priest *</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Name of pastor or priest"
                      {...field}
                      className="w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pastorPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact of Pastor/Priest *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contact of pastor or priest"
                      {...field}
                      className="w-72 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bornAgain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Are You born again?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-72 ">
                        <SelectValue placeholder="Are you born again ?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {bornAgain === "Yes" && (
              <>
                <FormField
                  control={form.control}
                  name="when"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>When Did You Get Born Again*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="When Did You Get Born Again ?"
                          {...field}
                          className="w-72 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="how"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How Did You Get Born Again ?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How Did You Get Born Again ?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discipleshipRelationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Are you in a Discipleship Relationship ?
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-72 ">
                            <SelectValue placeholder="Are you in a Discipleship Relationship ?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {bornAgain === "Yes" && discipleshipRelationship === "Yes" && (
              <>
                {" "}
                <FormField
                  control={form.control}
                  name="disciplerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name Of Discipler</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name of Discipler"
                          {...field}
                          className=" w-72 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="disciplerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Of Discipler</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Discipler's Contact"
                          {...field}
                          className="w-72"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="disciplerAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Of Discipler</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dicipler's Address"
                          {...field}
                          className="w-72 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </FormSections>

          <div className="px-4 flex flex-col gap-4 text-blue-950 md:px-36 xl:px-44 ">
            <h2 className="font-semibold">DECLARATION</h2>
            <p className="text-sm text-slate-500">
              I, hereby declare that all the information submitted through this
              application of PRICE is with integrity. I confirm that if found
              guilty of any misinformation my application would be withdrawn. I
              promise to abide by the rules and regulation governing the
              operation of PRICE and am also aware that the training is two
              years intensive and is residential.
            </p>
            <FormField
              control={form.control}
              name="accept"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-start items-center gap-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>I Accept</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* ERROR AND SUCCESS MESSAGING ALERTS */}
          <FormSuccess message={success} />
          <FormError message={error} />
          <div className="flex gap-5 w-full justify-end p-5 px-5 md:px-36 xl:px-44 ">
            <Button
              onClick={() => reset()}
              disabled={isSubmitting}
              className=" outline outline-1 outline-gray-700  hover:bg-red-500 hover:text-gray-200 "
              variant="outline"
            >
              Clear
            </Button>
            <Button
              type="submit"
              className="px-8  w-48"
              disabled={isSubmitting || !accept}
            >
              {isSubmitting ? "Please wait..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
