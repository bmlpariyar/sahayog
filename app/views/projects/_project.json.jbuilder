json.extract! project, :id, :title, :description, :amount, :category_id, :video, :links, :created_at, :updated_at
json.url project_url(project, format: :json)
