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
    return {
      status: 404,
      body: { error: notFoundMessage }
    };
  }

  // Update the education data
  const { data, error } = await supabase
    .from('educations')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return {
      status: 500,
      body: { error: error.message }
    };
  }

  return {
    status: 200,
    body: { data }
  };
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
    return {
      status: 404,
      body: { error: notFoundMessage }
    };
  }

  // Update the experience data
  const { data, error } = await supabase
    .from('experiences')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return {
      status: 500,
      body: { error: error.message }
    };
  }

  return {
    status: 200,
    body: { data }
  };
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
    return {
      status: 404,
      body: { error: notFoundMessage }
    };
  }

  // Update the project data
  const { data, error } = await supabase
    .from('projects')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return {
      status: 500,
      body: { error: error.message }
    };
  }

  return {
    status: 200,
    body: { data }
  };
}
