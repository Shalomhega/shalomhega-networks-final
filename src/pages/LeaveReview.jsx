import { useMemo, useState } from "react";
import Section from "../components/ui/Section.jsx";
import Button from "../components/ui/Button.jsx";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

const projectTypes = ["Complete Community Development","Community Revamp","Community Systems","Onboarding","Verification System","Welcome System","Rules System","Role System","Automation","Notifications","Support System","Other"];
const MAX_IMAGE = 5 * 1024 * 1024;

function LeaveReview() {
  const [form, setForm] = useState({ name: "", project_type: "", review: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [state, setState] = useState({ loading: false, error: "", success: false });
  const initials = useMemo(() => form.name.trim().charAt(0).toUpperCase() || "?", [form.name]);

  function update(key, value) { setForm((f) => ({ ...f, [key]: value })); }
  function chooseImage(file) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setState({ loading:false,error:"Please choose a JPEG, PNG, or WEBP image.",success:false }); return; }
    if (file.size > MAX_IMAGE) { setState({ loading:false,error:"Profile images must be 5 MB or smaller.",success:false }); return; }
    setImage(file); setPreview(URL.createObjectURL(file)); setState({ loading:false,error:"",success:false });
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.project_type || form.review.trim().length < 10) {
      setState({ loading:false,error:"Please complete your name, project type, and a review of at least 10 characters.",success:false }); return;
    }
    if (!isSupabaseConfigured) { setState({ loading:false,error:"The review system is not configured yet. Add the Supabase environment variables to activate submissions.",success:false }); return; }
    setState({ loading:true,error:"",success:false });
    let profile_image_url = null;
    try {
      if (image) {
        const ext = image.name.split(".").pop().toLowerCase();
        const path = `public/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("review-profile-images").upload(path, image, { contentType:image.type, upsert:false });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("review-profile-images").getPublicUrl(path);
        profile_image_url = data.publicUrl;
      }
      const { error } = await supabase.from("reviews").insert({ name:form.name.trim(), project_type:form.project_type, review:form.review.trim(), profile_image_url });
      if (error) throw error;
      setForm({ name:"",project_type:"",review:"" }); setImage(null); setPreview(""); setState({loading:false,error:"",success:true});
    } catch (err) { setState({loading:false,error:"We could not submit your review right now. Please try again later.",success:false}); }
  }

  return <main className="bg-brand-field min-h-screen">
    <Section className="pt-28 sm:pt-36"><div className="max-w-3xl"><p className="text-cyan text-sm font-semibold tracking-[0.22em]">COMMUNITY FEEDBACK</p><h1 className="mt-5 text-4xl sm:text-6xl font-bold leading-tight">SHARE YOUR EXPERIENCE</h1><p className="mt-6 text-lg text-ink-muted leading-8">Your feedback can help other streamers, creators, and community owners understand what it is like to work with SHALOMHEGA NETWORKS.</p></div></Section>
    <Section className="pt-0"><form onSubmit={submit} className="mx-auto max-w-3xl rounded-3xl border border-border bg-surface/90 p-6 sm:p-10 shadow-2xl shadow-purple/5">
      {state.success && <div className="mb-7 rounded-2xl border border-cyan/30 bg-cyan/10 p-5 text-sm leading-7">Thank you for sharing your experience. Your review has been submitted successfully and is now waiting for approval. Once approved, it is usually published within approximately 5 to 10 minutes.</div>}
      {state.error && <div className="mb-7 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm">{state.error}</div>}
      <div className="grid gap-6">
        <label className="grid gap-2 text-sm font-medium">NAME<input value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Your name" className="rounded-xl border border-border bg-background px-4 py-3.5 outline-none focus:border-cyan" /></label>
        <div><div className="mb-2 flex items-center justify-between text-sm font-medium"><span>PROFILE IMAGE</span><span className="text-ink-muted text-xs">OPTIONAL</span></div><label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-border bg-background/70 p-5 hover:border-cyan/60"><div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-purple/20 text-xl">{preview ? <img src={preview} alt="Preview" className="h-full w-full object-cover" /> : initials}</div><div><p className="font-medium">Upload a profile image</p><p className="mt-1 text-xs text-ink-muted">JPEG, PNG, or WEBP, maximum 5 MB</p></div><input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={e=>chooseImage(e.target.files?.[0])}/></label></div>
        <label className="grid gap-2 text-sm font-medium">PROJECT TYPE<select value={form.project_type} onChange={e=>update("project_type",e.target.value)} className="rounded-xl border border-border bg-background px-4 py-3.5 outline-none focus:border-cyan"><option value="">Select your project type</option>{projectTypes.map(x=><option key={x}>{x}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-medium">YOUR REVIEW<textarea value={form.review} onChange={e=>update("review",e.target.value.slice(0,1500))} placeholder="Tell us about your experience working with SHALOMHEGA NETWORKS..." rows="7" className="resize-y rounded-xl border border-border bg-background px-4 py-3.5 outline-none focus:border-cyan" /><span className="text-right text-xs text-ink-muted">{form.review.length}/1500</span></label>
      </div>
      <p className="mt-7 text-sm leading-7 text-ink-muted">Reviews are checked before appearing publicly. Once your review is approved, it is usually published within approximately 5 to 10 minutes.</p>
      <Button type="submit" className="mt-7 w-full sm:w-auto px-8 py-4" disabled={state.loading}>{state.loading ? "SUBMITTING..." : "SUBMIT YOUR REVIEW"}</Button>
    </form></Section>
  </main>;
}
export default LeaveReview;
