using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace APM.WebAPI.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required (ErrorMessage = "Product Name is required", AllowEmptyStrings = false)]
        [MinLength(5, ErrorMessage = "Product Name min length is 5 characters")]
        [MaxLength(25, ErrorMessage = "Product Name max length is 25 characters")]
        public string ProductName { get; set; }


        [Required(ErrorMessage = "Product Code is required", AllowEmptyStrings = false)]
        [MinLength(8, ErrorMessage = "Product Code min length is 6 characters")]
        [MaxLength(8, ErrorMessage = "Product Code max length is 6 characters")]
        public string ProductCode { get; set; }

        public DateTime ReleaseDate { get; set; }
        public string Description { get; set; }
        public decimal Cost { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public List<string> Tags { get; set; }
        public string ImageUrl { get; set; }
    }
}