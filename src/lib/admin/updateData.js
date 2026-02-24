import { NextResponse } from 'next/server';

export async function updateEducationById({
  supabase,
  id,
  updateData,
  notFoundMessage
}) {
  // Check if the education exists
  const { data: existing } = await supabase
    .from('educations')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (!existing) {
    return NextResponse.json({ error: notFoundMessage }, { status: 404 });
  }

  // Update the education data
  const { data, error } = await supabase
    .from('educations')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    data
  });
}

export async function updateExperienceById({
  supabase,
  id,
  updateData,
  notFoundMessage
}) {
  // Check if the experience exists
  const { data: existing } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (!existing) {
    return NextResponse.json({ error: notFoundMessage }, { status: 404 });
  }

  // Update the experience data
  const { data, error } = await supabase
    .from('experiences')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    data
  });
}

export async function updateProjectById({
  supabase,
  id,
  updateData,
  notFoundMessage
}) {
  // Check if the project exists
  const { data: existing } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (!existing) {
    return NextResponse.json({ error: notFoundMessage }, { status: 404 });
  }

  // Update the project data
  const { data, error } = await supabase
    .from('projects')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    data
  });
}
