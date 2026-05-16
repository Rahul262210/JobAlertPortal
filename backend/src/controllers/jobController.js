import { supabase } from '../config/supabase.js';

export const getAllJobs = async (req, res, next) => {
  try {
    const { search, category, location, experience, featured, page = 1, limit = 12 } = req.query;

    let query = supabase
      .from('jobs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Apply filters
    if (search) {
      query = query.or(`title.ilike.%${search}%,company.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    if (experience) {
      query = query.eq('experience', experience);
    }

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    // Pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const totalPages = Math.ceil(count / limit);

    res.json({
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const { title, company, location, salary, experience, category, description, apply_link, company_logo, featured } = req.body;

    if (!title || !company || !location || !salary || !experience || !category || !description || !apply_link) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('jobs')
      .insert([
        {
          title,
          company,
          location,
          salary,
          experience,
          category,
          description,
          apply_link,
          company_logo: company_logo || null,
          featured: featured || false,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({
      message: 'Job created successfully',
      data: data[0],
    });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, company, location, salary, experience, category, description, apply_link, company_logo, featured } = req.body;

    const { data, error } = await supabase
      .from('jobs')
      .update({
        title,
        company,
        location,
        salary,
        experience,
        category,
        description,
        apply_link,
        company_logo: company_logo || null,
        featured: featured || false,
      })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({
      message: 'Job updated successfully',
      data: data[0],
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
};
