module ApplicationHelper
  def coma_format(amount)
    number_with_delimiter(amount, delimiter: ",")
  end
end
