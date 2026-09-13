import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/ui/Section.jsx";
import Button from "../components/ui/Button.jsx";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

function Avatar({review}) { return review.profile_image_url ? <img src={review.profile_image_url} alt="" className="h-12 w-12 rounded-full object-cover"/> : <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple/20 font-bold text-cyan">{review.name?.charAt(0)?.toUpperCase()}</div>; }
function Reviews() {
 const [reviews,setReviews]=useState([]), [state,setState]=useState("loading");
 useEffect(()=>{ let alive=true; async function load(){ if(!isSupabaseConfigured){ if(alive) setState("empty"); return;} const {data,error}=await supabase.from("reviews").select("id,name,profile_image_url,project_type,review,rating,created_at").eq("approved",true).order("created_at",{ascending:false}); if(!alive)return; if(error)setState("error"); else {setReviews(data||[]);setState((data||[]).length?"ready":"empty");}} load(); return()=>{alive=false};},[]);
 return <main className="bg-brand-field min-h-screen"><Section className="pt-28 sm:pt-36"><div className="max-w-4xl"><p className="text-cyan text-sm font-semibold tracking-[0.22em]">REAL EXPERIENCES, SHARED BY REAL PEOPLE</p><h1 className="mt-5 text-4xl sm:text-6xl font-bold">WHAT PEOPLE SAY ABOUT THE WORK</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">The best way to understand a project is often through the experience of the people involved.</p></div></Section><Section className="pt-0"><div className="mb-8 flex items-end justify-between gap-5"><div><p className="text-cyan text-sm font-semibold">COMMUNITY FEEDBACK</p><h2 className="mt-2 text-3xl font-bold">Approved experiences</h2></div><Button to="/leave-a-review" variant="outline">LEAVE A REVIEW</Button></div>
 {state==="loading" && <div className="grid gap-5 md:grid-cols-2">{[1,2,3,4].map(i=><div key={i} className="h-64 animate-pulse rounded-3xl border border-border bg-surface"/>)}</div>}
 {state==="error" && <div className="rounded-3xl border border-border bg-surface p-10 text-ink-muted">We could not load community feedback right now. Please try again later.</div>}
 {state==="empty" && <div className="rounded-3xl border border-dashed border-purple/30 bg-surface/80 p-10 sm:p-16 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple/15 text-2xl">✦</div><h3 className="mt-6 text-2xl font-bold">The first community experiences will appear here.</h3><p className="mx-auto mt-3 max-w-xl text-ink-muted leading-7">Return later to explore approved feedback from completed projects.</p><Button to="/leave-a-review" className="mt-7">SHARE YOUR EXPERIENCE</Button></div>}
 {state==="ready" && <div className="grid gap-5 md:grid-cols-2">{reviews.map(r=><article key={r.id} className="rounded-3xl border border-border bg-surface p-7 transition hover:border-purple/50"><div className="flex items-center gap-4"><Avatar review={r}/><div><h3 className="font-semibold">{r.name}</h3><p className="text-xs text-cyan">{r.project_type}</p></div><div className="mt-2 flex gap-1 text-xl">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={star <= r.rating ? "text-yellow-400" : "text-gray-600"}
    >
      ★
    </span>
  ))}
</div>></div></div><p className="mt-6 leading-8 text-ink-muted">{r.review}</p></article>)}</div>}
 </Section><Section><div className="rounded-3xl border border-border bg-gradient-to-br from-purple/10 to-cyan/5 p-8 sm:p-12"><p className="text-cyan text-sm font-semibold">SHARE YOUR EXPERIENCE</p><h2 className="mt-3 text-3xl font-bold">Worked with us on your community?</h2><p className="mt-4 max-w-2xl text-ink-muted leading-7">Your feedback can help future clients understand the development experience.</p><Link to="/leave-a-review" className="mt-6 inline-flex rounded-full bg-purple px-6 py-3 font-medium">LEAVE A REVIEW</Link></div></Section></main>
}
export default Reviews;
